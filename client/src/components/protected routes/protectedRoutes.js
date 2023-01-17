import { Routes } from "react-router-dom";
import { ClearanceProvider } from "../auth/clearanceProvider";
import Pay from "./pay";


const ProtectedRoutes = () => {
  return (
    <ClearanceProvider path='/pay' component={Pay} clearance='2' authLevel={2}/>
  )
};



export default ProtectedRoutes;