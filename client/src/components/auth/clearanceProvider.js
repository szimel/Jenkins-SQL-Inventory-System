import jwtDecode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";


const ClearanceProvider = ({ allowedRoles }) => {
  //auth from authContext always false (idky) so checking using local storage instead
  const Token = localStorage.getItem('token');
  const token = jwtDecode(Token);

  //if clearance exists on auth, check if it is greater than role
  const hasAccess = token?.clearance >= allowedRoles

  return (
      hasAccess
          ? <Outlet />
          : token
              //if user is logged in then go to unauthorized
              ? <Navigate to="/unauthorized" replace='true' />
              //if user somehow isn't logged in, send to login
              : <Navigate to="/login" replace='true' />
  );
}

export default ClearanceProvider;


