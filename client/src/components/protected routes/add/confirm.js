import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../../actions";
import AuthContext from "../../auth/authProvider";
import Header from "../../header";


const Confirm = () => {
  //for axios callback
  const dispatch = useDispatch();
  const navigate= useNavigate();

  //lets this page know what data to retrieve
  const { reRender } = useContext(AuthContext);

  //handles showing modal 
  const [showModal, setShowModal] = useState(false);

  //handles storing retrieved backend data
  const[backendData, setBackendData] = useState(null);

  //handles telling page when to render on edits
  const [render, setRender] = useState(null);


  //handles all logic on load
  useEffect(() => {
    data(reRender)
      .then(handleData(reRender));
  }, [render]);

  //determines what data to retrieve from backend
  async function data(url) {
    try {
      //gets data from db depending on data value
      const response = getProduct(url, dispatch, navigate)
        .then(setBackendData(response[0]));
    } catch (error) {
      console.error(error);
    };
  };

  //handles the data and processes it based of jobsite/product
  function handleData(info) {

    debugger
    //handle product
    if(info === 'product') {
      if (backendData === null) return null;
      return (
        <div className="container mt-5">
          <h5>Please confirm the product is correct:</h5>
          <div className="products" key={backendData.name}>
          <h4 grid-area="name">{backendData.name}</h4>
              <button grid-area="edit" type="button" onClick={(e) => {
                setRender(false);
                setShowModal(true);
              }}>Edit</button>
              <p grid-area='size'><b>Size: </b>{backendData.size}</p>
              <p grid-area='shape'><b>Shape: </b>{backendData.shape}</p>
              <p grid-area='status'><b>Status: </b>{backendData.status}</p>
              <p grid-area='quantity'><b>Quantity: </b>{backendData.quantity}</p>
              <p grid-area='recievedon'><b>Recieved On: </b>{backendData['recieved on']}</p>
          </div>
        </div>
      )
    } else {
      //handle jobsite
      if(backendData === null) return null;
      return (
        <div className="container mt-5">
          <h5>Please confim the jobsite is correct:</h5>
          <div>{backendData}</div>
        </div>
      )
    }
  };



  return (
    <>
      <Header />
      {handleData(reRender)}
    </>
  );
};

export default Confirm;