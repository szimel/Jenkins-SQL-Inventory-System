import jwt_decode from 'jwt-decode';
import { createContext, useEffect, useState } from "react";

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
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;
