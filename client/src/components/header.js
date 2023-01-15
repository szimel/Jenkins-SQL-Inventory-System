import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSignOut, isLoggedIn } from '../actions';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(isLoggedIn())
  }, [])

  //sign the user out
  function userSignOut() {
    dispatch(handleSignOut(() => {
      navigate('/', {replace: true});
    }));
  }

  //code to send to right click
  function navigateTo(link) {
    return navigate(`/${link}`, {replace: true});
  }
  
  return (
    // container fluid sets width to max. 
    <div className="container-fluid header-container">
      <div className="row">
        {/* responsive design on boostrap means this is always 25% of screen */}
        <div className="col-4 home">
          <p>Home</p>
        </div>
        <div className="col-1 database">
          <p>Add</p>
        </div>
        <div className="col-1 search" onClick={()=>navigateTo('search')}>
          <p>Search</p>
        </div>
        <div className="col-1 pay" onClick={()=>navigateTo('accounting')}>
          <p>Pay</p>
        </div>
        <div className="col-5 logout" onClick={userSignOut}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
};

export default Header;