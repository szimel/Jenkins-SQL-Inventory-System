import { useContext } from "react";
import AuthContext from "./components/auth/authProvider";
import ClearanceProvider from "./components/auth/clearanceProvider";
import Unauthorized from "./components/auth/unauthorized";
import Home from "./components/home";
import Pay from "./components/protected routes/pay";
// import ProtectedRoutes from "./components/protected routes/protectedRoutes";
import LogIn from "./components/SignUp-LogIn/logIn";
import SignUp from "./components/SignUp-LogIn/signUp";

const { Routes, Route } = require("react-router-dom")


const App = () => {
  const roles = {
    'search': 0,
    'pay': 1000,
    'chad': 6900,
  }

  return(
    <>
      <Routes>
        {/* unprotected routes */}
        <Route path='/' element={<Home />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />

      {/* Protected routes */}
        <Route element={<ClearanceProvider allowedRoles={[roles.pay]}/>}>
          <Route path='/pay' element={<Pay />} />
        </Route>

      </Routes>
    </>

  )
}

export default App;