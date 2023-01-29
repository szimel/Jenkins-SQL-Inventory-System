import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import AuthContext from "../auth/authProvider";

const ProductCards = () => {
  
  let product = useSelector(state => state);

  //checks current use Auth level 
  const { clearance } = useContext(AuthContext);

  //handle showing modal
  const [showModal, setShowModal] = useState(false);

  // the product which was clicked to show the modal
  const [selectedProduct, setSelectedProduct] = useState({});

  function productCards() {
    if(product.products.result) {
      //format of cards 

      const productElements = product.products.result.map((product) => {
        return (
          <div className="products" key={product.name}>
            <h4 grid-area="name">{product.name}</h4>
            {clearance && <button grid-area="edit" type="button" onClick={() => {
              setShowModal(true);
              setSelectedProduct(product);
            }}>Edit</button>}
            <p><b>Size: </b>{product.size}</p>
            <p><b>Shape: </b>{product.shape}</p>
            <p><b>Status: </b>{product.status}</p>
            <p><b>Quantity: </b>{product.quantity}</p>
            <p><b>Recieved On: </b>{product['recieved on']}</p>
          </div>
        );
      });
      return productElements;
    } else return null;
  }

  return (
    <>
      {productCards()}
      {showModal && (
        <div className="modal-backdrop">
          <div id="modal">
            working
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
  
}

export default ProductCards;
