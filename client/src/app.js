import ClearanceProvider from "./components/auth/clearanceProvider";
import Unauthorized from "./components/auth/unauthorized";
import Home from "./components/home";
import Pay from "./components/protected routes/pay";
import LogIn from "./components/SignUp-LogIn/logIn";
import NotExist from "./components/404";
import SignUp from "./components/SignUp-LogIn/signUp";
import Search from "./components/protected routes/inventory.js";
import Add from "./components/protected routes/add";

const { Routes, Route, useNavigate } = require("react-router-dom")


const App = () => {
  //defines roles for clearance provider
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
        <Route path='/*' element={<NotExist />} />
        {/* <Route path='/signup' element={<SignUp />} /> */}

      {/* Protected routes */}
        <Route element={<ClearanceProvider allowedRoles={[roles.pay]}/>}>
          <Route path='/pay' element={<Pay />} />
        </Route>
        <Route>
          <Route path='/inventory' element={<Search />} />
        </Route>
        <Route element={<ClearanceProvider allowedRoles={[roles.chad]}/>}>
          <Route path='/add' element={<Add />} />
        </Route>
      </Routes>
    </>

  )
}

export default App;