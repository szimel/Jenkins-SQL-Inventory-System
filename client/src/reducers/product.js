import { PRODUCT } from "../actions/types";

const productReducer = function(state = [], action) {
  switch(action.type) {
    case PRODUCT: 
      return action.payload
    default: 
      return state;  
  };
};

export default productReducer;