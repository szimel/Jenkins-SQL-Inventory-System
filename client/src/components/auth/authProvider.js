// import { useReducer } from 'react';
import jwt_decode from 'jwt-decode';
// import { createContext } from 'react';
import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext({
//   isAuthenticated: false,
// });






// const AuthProvider = ({ children }) => dispatch => {

  //  const token = localStorage.getItem('token') || undefined;

  // if (!token) {
  //   return dispatch({ type: 'LOGGEDOUT' });
  // } else {
  //   try {
  //     const decoded = jwt_decode(token);
  //     const exp = decoded.exp;
  //     const currentTime = Date.now() / 1000;

  //     if (exp < currentTime) {
  //       return dispatch({ type: 'LOGGEDOUT' });
  //     } else {
  //       return dispatch({ type: 'LOGGEDIN' });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return dispatch({ type: 'LOGGEDOUT' });
  //   }
  // }
//   // return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
// };

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  //to stop rerenders
  useEffect(() => {
    const token = localStorage.getItem('token') || undefined;

    if (!token) {
      setAuth(false);
    } else {
      try {
        const decoded = jwt_decode(token);
        const exp = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          setAuth(false);
        } else {
          setAuth(true);
        }
      } catch (err) {
        console.log(err);
        setAuth(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;
