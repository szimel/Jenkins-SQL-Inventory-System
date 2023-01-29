import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import AuthContext from "../auth/authProvider";


const ProductCards = () => {
  
  let product = useSelector(state => state);

  //checks current use Auth level 
  const { clearance } = useContext(AuthContext);

  //handle showing modal
  const [showModal, setShowModal] = useState(false);


  function productCards() {
    if(product.products.result) {
      //format of cards 

      const productElements = product.products.result.map((product) => {
        //for showModal so it knows which product was clicked
        let productId = product.idproducts;
        return (
          <div className="products" key={product.name}>
            <h4 grid-area="name">{product.name}</h4>
            {clearance && <button grid-area="edit" onClick={() => setShowModal(productId)}>Edit</button>}
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
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
    )}
    </>
  )
};

export default ProductCards;