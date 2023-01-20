import { useContext, useEffect } from "react";
import AuthContext from "../auth/authProvider";


const Pay = () => {
  //run authProvider on page load
  const { updateAuth } = useContext(AuthContext);
  useEffect(() => {
    updateAuth('');
  });

  return (
    <div>this is really working for appapaypapa</div>
  )
};

export default Pay;