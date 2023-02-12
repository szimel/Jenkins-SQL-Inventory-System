import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPaidProduct, getPayQueryProducts, getUnPaidProducts } from "../../../actions";
import Header from "../../header";



const Pay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //set value of search input
  const [searchTerm, setSearchTerm] = useState('');

  //holds all data 
  const [data, setData] = useState(null);
  //manages if something is searched for
  const [search, setSearch] = useState(false);

  //handles showing of edit modal
  const [showModal, setShowModal] = useState(false);

  //hold the product data of clicked edit buttons
  const [selectedProduct, setSelectedProduct] = useState(null);

  //sets the value of the select in the modal
  const [selectedValue, setSelectedValue] = useState('no');

  useEffect(() => {
    //sets data global var
    getBackendProducts();
  }, [])


  //function that displays whatever global var data has been set as
  function displayProducts() {
    //catches when data hasn't been set
    if(data === null) return <p><u>Loading...</u></p>

    //maps through data that is set in axios call function
    const productElements = data.map(product => {
      return (
        <div className="products" key={product.idproducts}>
        <h4 grid-area="name">{product.name}</h4>
        <button grid-area="edit" type="button" onClick={() => {
          //opens the modal
          setShowModal(true);

          //sets selectedProduct as the clicked product
          setSelectedProduct(product);
        }}>Paid?</button>
        <p grid-area='size'><b>Size: </b>{product.size}</p>
        <p grid-area='shape'><b>Shape: </b>{product.shape}</p>
        <p grid-area='status'><b>Status: </b>{product.status}</p>
        <p grid-area='quantity'><b>Quantity: </b>{product.quantity}</p>
        <p grid-area='recievedon'><b>Recieved On: </b>{product['recieved on']}</p>
        <p><b>Paid: </b>{product.paid}</p>
      </div>
      );
    })
    return productElements;
  }

  //makes backend req for products matching search terms
  async function handleSearch() {
    await getPayQueryProducts(searchTerm, dispatch, navigate)
    .then(response => {
      //sets data var to the response for displaySearchedProducts
      setData(response);

      //hides the default displayed data
      setSearch(true);
    }).catch(function(err) {
      return new Error(err);
    });
  };

  //gets unpaid products from backend
  async function getBackendProducts() {
    await getUnPaidProducts(dispatch, navigate)
      .then(response => {
        setData(response);
      }).catch(function(err) {
        return new Error(err);
      })
  };

  async function handleModalClose() {
    //if nothing was edited
    if(selectedValue === 'no') return setShowModal(false);
    //tells backend which product to update
    const id = selectedProduct.idproducts

    await editPaidProduct(id, dispatch, navigate)
      .then(() => {
        getBackendProducts();
        setShowModal(false);
      })
  }


  return (
    <>
      <Header />
      <div className="container pay-container m-5" >
        <label>Search: </label>
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleSearch()}} />
        <button type="submit" onClick={() => handleSearch()}>Search</button>
      </div>
      <div className="container-products">
        {!search && displayProducts()}
        {search && displayProducts()}
      </div>
      {/* Modal html */}
      {showModal && (
        <div className="modal-backdrop">
          <div id="modal">
            <p>Has this item been paid?</p>
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value={'no'}>No</option>
              <option value={'yes'}>Yes</option>
            </select>
            <button className="btn btn-dark" onClick={() => handleModalClose()}>Submit</button>
          </div>
        </div>
      )}


    </>
  )
};

export default Pay;