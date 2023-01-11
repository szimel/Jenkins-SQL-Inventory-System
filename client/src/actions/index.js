import axios from "axios";
import { VALID_EMAIL } from './types';

export const backendTest = () => dispatch => {
  console.log('axios call');
  axios.get('http://localhost:5000/test')
  .then(function (response) {
    dispatch({type: VALID_EMAIL, payload: response.data})
  });
};


// export const backendTest = () => {

// }