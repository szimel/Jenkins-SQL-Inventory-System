//takes componenet, clearance, and auth level and decides if user has correct auth level
const ClearanceProvider = ({ component: Component, clearance, authLevel, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        clearance >= authLevel ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
    )
  };

  
