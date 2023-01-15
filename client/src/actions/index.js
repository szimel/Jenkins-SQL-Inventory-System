import axios from "axios";
import { VALID_EMAIL, AUTH_USER, CURRENT_USER } from './types';

export const isLoggedIn = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  }
  axios.get('http://localhost:5000/user', config)
    .then(function (response) {
      dispatch({ type: CURRENT_USER, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
}

//for signing up
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

//login async function
export async function handleLogIn(data, dispatch) {
  try {
      const response = await axios.post('http://localhost:5000/login', data);
      
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

//signout logic
export const handleSignOut = (callback) => dispatch =>{
  localStorage.removeItem('token');

  //let redux state know there isn't a user
  dispatch({ type: AUTH_USER, payload: '' });
  callback();
}