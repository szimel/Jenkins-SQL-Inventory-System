import * as Yup from 'yup';
import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getJobsites, getJobsiteProducts } from '../../actions';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCards from './productCards';

const searchSchema = Yup.object().shape({
  jobsite: Yup.string().required('This is a required field'),
  // query: Yup.string().required('This is a required field')
});

const SearchJobsite = () => {

  //for axios token check
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(searchSchema)
  });

  // gets data from backend
  const handleFormSubmit = async(data, event) => {
    event.preventDefault();
    //dispatch that returns correct jobID for products to be in redux store
    dispatch(getJobsiteProducts(data, dispatch, navigate));
  };

  // grab jobsite data after load and set it global
  const [data, setData] = useState([]);
  useEffect(() => {
    jobsites().then(res => setData(res));
  }, []);

  //backend call to retrieve all jobsites
  const jobsites = async () => {
    try {
      const response = await getJobsites(dispatch, navigate);

      //catches re renders of page 
      if(response.jobsites === undefined) {
        return null;
      }

      //cuz two arrays returned
      return response.jobsites[0];
    } catch (error) {
      console.error(error);
    };
  };

  //function that returns jsx of jobsites
  function displayJobs() {
    if(data === null) {
      return null;
    };
    return (
      <>
        <label>Job: </label>
        <select {...register('jobsite', {required: true})} className='form-control'>
          <option value={''} >Click me</option>
          {data.map(row => <option key={row.idjobs} value={row.idjobs}>{row.name}</option>)}
        </select>
      </>
    );
  }
  

  return(
    <>
      <div className="container-fluid search-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {displayJobs()}
          <p>{errors.jobsite?.message}</p>
          <button type='submit' className='btn btn-dark'>Search</button>
        </form>
      </div>
      <div className='container-fluid'>
        <div className='container-products'>
          <ProductCards />
        </div>
      </div>
    </>
  );
};

export default SearchJobsite;