import * as Yup from 'yup';
import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { getJobsiteProducts } from '../../actions';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCards from './productCards';
import DisplayJobs from './displayJobs';

const searchSchema = Yup.object().shape({
  jobsite: Yup.string()
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

  //sets jobsite from jsx file
  const selectedJobsite = useSelector(state => state);

  // gets data from backend
  const handleFormSubmit = async() => {

    //sets jobsite from other jsx file
    const data = {jobsite: selectedJobsite.jobsite.id};

    //dispatch that returns correct jobID for products to be in redux store
    dispatch(getJobsiteProducts(data, dispatch, navigate));
  };
  

  return(
    <>
      <div className="container-fluid search-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DisplayJobs />
          {/* {displayJobs()} */}
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