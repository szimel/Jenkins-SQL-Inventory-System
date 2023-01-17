import ClearanceProvider from "./components/auth/clearanceProvider";
import Unauthorized from "./components/auth/unauthorized";
import Home from "./components/home";
import Pay from "./components/protected routes/pay";
import LogIn from "./components/SignUp-LogIn/logIn";
import SignUp from "./components/SignUp-LogIn/signUp";
import Search from "./components/protected routes/inventory.js";

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
        <Route>
          <Route path='/inventory' element={<Search />} />
        </Route>
      </Routes>
    </>

  )
}

export default App;