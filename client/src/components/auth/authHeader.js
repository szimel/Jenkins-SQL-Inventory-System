import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../../actions';

// Function that returns the authorization headers using token from localStorage
const AuthHeaders = ({ auth, updateAuth}) => {
  const navigate = useNavigate();

  let config = {};
  const token = localStorage.getItem('token') || undefined;
  //if no token e
  if (!token || !auth) {
    throw new Error('Session not found');
  }

  //check if token has expired
  try {
    const decoded = jwt_decode(token);
    const exp = decoded.exp;
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      handleSignOut(() => {
        new Error('Token expired');
        navigate('/', {replace: true});
      })
    }
    //sets config so it can be returned to const in another axios funct
    config = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
  } catch (err) {
    throw err;
  }
  //gives config value to this function
  return config;
}

export default AuthHeaders;
