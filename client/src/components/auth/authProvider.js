import jwt_decode from 'jwt-decode';
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  //so other code like login can re render the useEffect
  const [Auth, updateAuth] = useState('');

  //to stop rerenders
  useEffect(() => {
    const token = localStorage.getItem('token') || undefined;

    if (!token) {
      // console.log('no token false');
      setAuth(false);
    } else {
      try {
        const decoded = jwt_decode(token);
        const exp = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          // console.log('session false');
          setAuth(false);
        } else {
          //gives global auth state clearance and user
          // console.log('set true');
          setAuth({
            clearance: decoded.clearance,
            user: decoded.user
          });
        }
      } catch (err) {
        console.log(err)
        setAuth(false);
      }
    }
  }, [Auth]);

  return (
    <AuthContext.Provider value={{ updateAuth, auth }}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;
