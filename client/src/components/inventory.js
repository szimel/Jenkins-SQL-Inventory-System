import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backendTest } from "../actions";


const Inventory =() => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(backendTest());
    // axios.get('http://localhost:5000/test');
  }, [])
  let state = useSelector(state => state);

  function run() {
    console.log(state);
  };
  return (
    <div>
      <p onClick={run}>it somehow worked hore</p>
    </div>
  );
};

export default Inventory;