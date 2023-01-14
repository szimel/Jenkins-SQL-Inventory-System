import axios from "axios";
import { useDispatch } from "react-redux";
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

export async function handleSignup(data, dispatch) {
  try {
      const response = await axios.post('http://localhost:5000/signup', data);
      
      //if success from backend
      if (!response.data.error) {
        //set token the dispatch to store
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER, payload: response.data });
        return 201;
      }
  
  //any kind of err caught and categorized by signUp.js
  } catch (err) {
    return err.response.status;
  }
}