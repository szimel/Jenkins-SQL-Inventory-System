import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getJobsites } from '../../actions';

const searchSchema = Yup.object().shape({
  jobsite: Yup.string().required('This is a required field'),
  query: Yup.string().required('This is a required field')
});

const SearchJobsite = () => {
  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(searchSchema)
  });

  const handleFormSubmit = async(data, event) => {
    event.preventDefault();
    console.log(data);
  }

  // grab jobsite data after load and set it global
  const [data, setData] = useState([]);
  useEffect(() => {
    jobsites().then(res => setData(res));
  }, []);

  //backend call to retrieve all jobsites
  const jobsites = async () => {
    try {
      const response = await getJobsites();

      //catches re renders of page 
      if(response.jobsites === undefined) {
        return null;
      }

      //cuz two arrays returned
      return response.jobsites[0];
    } catch (error) {
      console.error(error);
    }
  }

  //function that returns jsx of jobsites
  function displayJobs() {
    if(data === null) {
      return <div>There was a server error. Please log out and in.</div>
    };
    return (
      <>
        <label>Job: </label>
        <select {...register('jobsite', {required: true})} className='form-control'>
          <option value={''} >Select</option>
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
          <p className="">{errors.jobsite?.message}</p>
          {/* <input 
            {...register("query", {required: true})}
            type="text" 
            className="form-control" 
            placeholder="Search..." 
          />
          <p className="">{errors.query?.message}</p> */}
          <button type='submit' className='btn btn-dark'>Search</button>
        </form>
      </div>
    </>
  );
};

export default SearchJobsite;