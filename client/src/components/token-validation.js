import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../actions';

export async function tokenValidation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  try {
    const decoded = jwt_decode(token);
    const exp = decoded.exp;
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      // token has expired
      alert("Your session has expirtd, please re-login.")
      dispatch(handleSignOut(() => {
        navigate("/", { replace: true });
      }));
    } else {
      // token is still valid
      console.log("Token is still valid");
    }
  } catch(err) {
    console.log(err);
  }
}