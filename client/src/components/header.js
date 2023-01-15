import LogoutIcon from '@mui/icons-material/LogoutRounded';

const Header = () => {
  
  return (
    // container fluid sets width to max. 
    <div className="container-fluid header-container">
      <div className="row">
        {/* responsive design on boostrap means this is always 25% of screen */}
        <div className="col-3 database">
          <p>Database</p>
        </div>
        <div className="col-3 search">
          <p>Search</p>
        </div>
        <div className="col-3 accounting">
          <p>Accounting</p>
        </div>
        <div className="col-3 logout">
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
};

export default Header;