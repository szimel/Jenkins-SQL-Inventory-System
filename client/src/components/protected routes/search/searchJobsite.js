import * as Yup from 'yup';
import React, { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { getJobsiteProducts } from '../../../actions';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCards from './productCards';
import DisplayJobs from '../displayJobs';
import AuthContext from '../../auth/authProvider';

const searchSchema = Yup.object().shape({
  jobsite: Yup.string(),
  query: Yup.string().max(50),
  // query: Yup.string().required('This is a required field')
});

const SearchJobsite = () => {
  //set by productCard.js so edits are rendered again
  const { reRender } = useContext(AuthContext);

  //for axios token check
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(searchSchema)
  });

  //re renders product cards on edit submit
  useEffect(() => {
    handleFormSubmit();
  }, [reRender]);


  //sets jobsite from jsx file
  const selectedJobsite = useSelector(state => state);

  // gets data from backend
  const handleFormSubmit = async() => {

    //sets jobsite from other jsx file
    const data = {jobsite: selectedJobsite.jobsite.id};
    // debugger;

    //dispatch that returns correct jobID for products to be in redux store
    dispatch(getJobsiteProducts(data, dispatch, navigate));
  };
  

  return(
    <>
      <div className="container-fluid search-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DisplayJobs />
          <p>{errors.jobsite?.message}</p>

          {/* <input placeholder='This is optional'/>
          <p>{errors.query?.message}</p> */}
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