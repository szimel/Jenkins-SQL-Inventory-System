import jwt_decode from 'jwt-decode';
import { createContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../../actions';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //sets auth state for other components
  const [auth, setAuth] = useState(false);

  //so i can render edit buttons for high clearance users
  const[clearance, setClearance] = useState(false);

  //so other code like login can re render the useEffect
  const [Auth, updateAuth] = useState('');

  //so edit button can re render product cards
  // const [renderProductCards, setRenderProductCard] = useState('asdf');
  const [reRender, setReRender] = useState('');

  //so an expired token is removed from local storage
  const dispatch = useDispatch();
  //so I can send logged out users to home page
  const navigate = useNavigate();


  //to stop rerenders
  useEffect(() => {
    const token = localStorage.getItem('token') || undefined;
    if (!token) {
      handleSignOut(() => {
        setAuth(false)
        new Error('No Token');
        return navigate('/', {replace: true});
      })
    } else {
      try {
        const decoded = jwt_decode(token);
        const exp = decoded.exp;
        const currentTime = Date.now() / 1000;
        
        //sets clearance to true so jsx files render edit button
        decoded?.clearance >= 6900 ? setClearance(true) : setClearance(false);


        if (exp < currentTime) {
          // console.log('session false');
          setAuth(false);
          //removes token from storage and updates redux store - empty callback function(hacky fix)
          dispatch(handleSignOut(() => {return null}));
          new Error('Token Expired');
          return navigate('/unauthorized', {replace: true});

        } else {
          //gives global auth state clearance and user
          setAuth({
            clearance: decoded.clearance,
            user: decoded.user
          });
        }

      } catch (err) {
        handleSignOut(() => {
          setAuth(false);
          new Error('Auth Provier Catch', err);
          navigate('/', {replace: true});
        })
      }
    }
  }, [Auth]);

  //gives children of <authProvider> access to updateAuth and auth
  return (
    <AuthContext.Provider value={{
       updateAuth, 
       auth, 
       clearance, 
      //  renderProductCards, 
      //  setRenderProductCard,
       reRender,
       setReRender
       }}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;
