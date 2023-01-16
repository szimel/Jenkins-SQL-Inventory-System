import { useContext } from "react";
import { useSelector } from "react-redux";
import AuthContext from "./auth/authProvider";
import Header from "./header";


function App() {
  //grab state of auth from authProvider
  const { auth } = useContext(AuthContext);

  let state = useSelector(state => state);

  function run() {
    console.log(state);
  };
  
  return (
    <div className="">
      <Header />
      {!auth ? (
        <div className="container container-home">
          <p>Welcome to the warehouse inventory website. The purpose of this website is to show all inventory at the IDKCOMPANYNAME warehouse.</p>
          <ul>
            <li>
              If this is your first time, please click on <a href="/signup"><u>Sign Up</u></a> to create an account.
            </li>
            <li>
              If you already have an account, please click on <a href='/login'><u>Log In</u></a> to see warehouse inventory.
            </li>
          </ul>
        </div>
      ) : (
        <div>Logged In!</div>
      )}
      <p onClick={run}>home ig</p>
    </div>
  );
}

export default App;
