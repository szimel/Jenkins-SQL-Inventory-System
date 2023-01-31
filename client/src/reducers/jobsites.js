import { SELECTED_JOBSITES } from "../actions/types";

const selectedJobsiteReducer = function(state = [], action) {
  switch(action.type) {
    case SELECTED_JOBSITES: 
      return action.payload
    default: 
      return state;  
  };
};

export default selectedJobsiteReducer;