import axios from "axios";
import { VALID_EMAIL, AUTH_USER } from './types';

export const backendTest = () => dispatch => {
  console.log('axios call');
  axios.get('http://localhost:5000/protected')
  .then(function (response) {
    dispatch({type: VALID_EMAIL, payload: response.data})
  });
};


export const signUp = (data, callback) => dispatch => {
  axios.post('http://localhost:5000/signup', data)
    .then(function(response) {
      if (response.data.error) {
        //display error message from response
        this.setState({error: response.data.error});
      } else {
        dispatch({ type: AUTH_USER, payload: response.data });
        localStorage.setItem('token', response.data.token);
        callback();
      }
    });
};