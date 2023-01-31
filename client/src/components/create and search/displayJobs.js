import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getJobsites } from "../../actions";
import { SELECTED_JOBSITES } from "../../actions/types";


const DisplayJobs = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    //calls jobsites and sets global var
    jobsites().then(res => setData(res));
  }, []);

  //makes a backend call and returns data
  const jobsites = async () => {
    try {
      const response = await getJobsites(dispatch, navigate);
      console.log(response)
      if(response.jobsites === undefined) {
        return null;
      }
      return response.jobsites[0];
    } catch (error) {
      console.error(error);
    }
  };

  //takes selected jobsite and returs it to redux store
  function handleSelect(e, dispatch) {
    //data to go to redux store. Grabs name and id of jobsite
    let selected = {};
    selected.id = e.target.value;
    selected.name = e.target.options[e.target.selectedIndex].text;

    dispatch({
      type: SELECTED_JOBSITES,
      payload: selected
    });
  }


  //hanldes displaying the UI of jobsites
  function displayJobs() {
    while (data === null) {
      return null
    };
    return (
      <>
        <label>Job: </label>
        <select className='input-field' onChange={e => handleSelect(e, dispatch)}>
          {/* <option value={''} >Select from below</option> */}
          {data.map(row => <option key={row.idjobs} value={row.idjobs}>{row.name}</option>)}
        </select>
      </>
    );
  }
  

  return (
    <>
      {displayJobs()}
    </>
  )
};

export default DisplayJobs;