import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSignOut, isLoggedIn } from '../actions';
import AuthContext from './auth/authProvider';

const Header = () => {
    //set state of auth from authProvider
    const { updateAuth, auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  //sign the user out
  function userSignOut() {
    dispatch(handleSignOut(() => {
      updateAuth(false);
      navigate('/', {replace: true});
    }));
  }

  //code to send to right click
  function navigateTo(link) {
    updateAuth('');
    return navigate(`/${link}`, {replace: true});
  }

  return (
    !auth ? (
      <React.Fragment>
        <div className="container-fluid header-container">
          <div className="row">
            {/* responsive design on boostrap means this is always 25% of screen */}
            <div className="col-5 home" onClick={()=>navigateTo('')}>
              <p>Home</p>
            </div>
            <div className="col-2 database" onClick={()=>navigateTo('login')}>
              <p>Log In</p>
            </div>
            <div className="col-2 search" onClick={()=>navigateTo('signup')}>
              <p>Sign Up</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="container-fluid header-container">
          <div className="row">
            {/* responsive design not using col so i cant change width on media query*/}
            <div className="home" onClick={()=>navigateTo('')}>
              <p>Home</p>
            </div>
            <div className="database" onClick={()=>navigateTo('add')}>
              <p>Add</p>
            </div>
            <div className="search" onClick={()=>navigateTo('inventory')}>
              <p>Search</p>
            </div>
            <div className="pay" onClick={()=>navigateTo('pay')}>
              <p>Pay</p>
            </div>
            <div className="logout" onClick={userSignOut}>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  )
};

export default Header;