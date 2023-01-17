import { Navigate, Route, Routes } from "react-router-dom";

//takes componenet, clearance, and auth level and decides if user has correct auth level
export const ClearanceProvider = ({ component: Component, clearance, authLevel, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        render={props =>
          clearance >= authLevel ? (

            <Component {...props} />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
    </Routes>
    )
  };


