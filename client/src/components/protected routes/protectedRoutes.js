import { Route, Routes } from "react-router-dom";
import { ClearanceProvider } from "../auth/clearanceProvider";
import Pay from "./pay";


// const ProtectedRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/pay' element={<ClearanceProvider />} render={props => <ClearanceProvider {...props} Component={Pay} clearance='2' authLevel={2} route='/pay'/>}/>
//     </Routes>
//   )
// };



// export default ProtectedRoutes;