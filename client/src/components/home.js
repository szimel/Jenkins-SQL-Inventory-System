import { useContext } from "react";
import { useSelector } from "react-redux";
import AuthContext from "./auth/authProvider";
import Header from "./header";


function Home() {
  //grab state of auth from authProvider
  const { auth } = useContext(AuthContext);

  
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
        <div className="container container-home">
          <ul>
            <li>
              Click on <a href="/search"><u>Search</u></a> to lookup inventory and see current stock
            </li>
            <li>
              Click on <a href="/pay"><u>Pay</u></a> to see receipts and inventory that needs to be paid
            </li>
            <li>
              Click on <a href="add"><u>Add</u></a> if you're an alpha big dog and are authorized for it
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
