import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUnPaidProducts } from "../../../actions";
import Header from "../../header";



const Pay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //holds all data 
  const [data, setData] = useState(null);
  //manages if something is searched for
  const [search, setSearch] = useState(false);


  //grabs all prducts that haven't been paid for yet
  useEffect(() => {
    getBackendProducts().then(res => setData(res));
  }, []);

  //grabs all produts that haven't been paid for yet
  function displayAllProducts() {
    if (data === null) return null;
    const productElements = data.map(product => {
      return (
        <div className="products" key={product.name}>
        <h4 grid-area="name">{product.name}</h4>
        {/* {!search && <button grid-area="edit" type="button" onClick={(e) => {
          // setReRender(false);
          // setShowModal(true);
          // //sets selectedProduct to clicked product
          // setSelectedProduct(product);
        }}>Edit</button>} */}
        <p grid-area='size'><b>Size: </b>{product.size}</p>
        <p grid-area='shape'><b>Shape: </b>{product.shape}</p>
        <p grid-area='status'><b>Status: </b>{product.status}</p>
        <p grid-area='quantity'><b>Quantity: </b>{product.quantity}</p>
        <p grid-area='recievedon'><b>Recieved On: </b>{product['recieved on']}</p>
      </div>
      );
    });
    return productElements;
  };

  async function getBackendProducts() {
    try {
      //gets data from backend
      const response = await getUnPaidProducts(dispatch, navigate)
      return response[0];     
    } catch(err) {
      throw new Error(err)
    }
  };

  return (
    <>
      <Header />
      <div className="container pay-container m-5" >
        <label>Search: </label>
        <input />
        <button type="submit"></button>
      </div>
      <div className="container-products">
        {!search && displayAllProducts()}
      </div>

    </>
  )
};

export default Pay;