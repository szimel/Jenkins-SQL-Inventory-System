import { JOBSITE_PRODUCTS } from "../actions/types";

const jobsiteProductReducer = function(state = [], action) {
  switch(action.type) {
    case JOBSITE_PRODUCTS: 
      return action.payload
    default: 
      return state;  
  };
};

export default jobsiteProductReducer;