import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getJobsites, getJobsiteProducts } from '../../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    console.log(data);

    const response = await getJobsiteProducts(data, dispatch, navigate);
    
    //catch if bad req
    setJobsite(response.jobsites[0]);
    console.log(response.jobsites[0]);
  }

  // grab jobsite data after load and set it global
  const [data, setData] = useState([]);
  const [jobsiteData, setJobsite] = useState(false);
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

  //function that returns jsx of jobsite products 
  function productCards() {
    if(jobsiteData === null) {
      return <div>There was a server error. Please log out and in.</div>
    } else if (jobsiteData === false) return null

    const productElements = jobsiteData.map((product) => {
      return (
          <div className="products" key={product.name}>
            <h4>{product.name}</h4>
            <p><b>Size: </b>{product.size}</p>
            <p><b>Shape: </b>{product.shape}</p>
            <p><b>Status: </b>{product.status}</p>
            <p><b>Quantity: </b>{product.quantity}</p>
            <p><b>Recieved On: </b>{product['recieved on']}</p>
          </div>
      );
    });
    return productElements;
  }
  

  return(
    <>
      <div className="container-fluid search-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {displayJobs()}
          <p className="">{errors.jobsite?.message}</p>
          <button type='submit' className='btn btn-dark'>Search</button>
        </form>
      </div>
      <div className='container-fluid'>
        <div className='container-products'>
          {productCards()}
        </div>
      </div>

    </>
  );
};

export default SearchJobsite;