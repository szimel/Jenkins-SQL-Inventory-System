import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExtraProducts } from "../../../actions";
import ProductCards from "./productCards";


const Extra = () => {
  //has the value of the ui search
  const [search, setSearch] = useState('');

  //has the value of the backend db results
  const [products, setProducts] = useState(null);

  //for axios verification
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //gets all extraId products from backend
  useEffect(() => {
    getProduct()
  }, [])

  //gets both search and all products of extraId
  async function getProduct() {
    
    //gets products based off search and returns them 
    await getExtraProducts(search, dispatch, navigate)
      .then(response => {
        setProducts(response);
      }).catch(function(err) {
        new Error('handleSubmit error')
        return new Error(err);
      });
  }

  return (
    <>
      <div className="container-fluid search-container">
        <label>Search:</label>
        <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') getProduct()}}/>
        <button className="btn btn-dark" onClick={() => getProduct()}>Search</button>
      </div>
      <div className="container-products">
        <ProductCards products={products} />
      </div>
    </>
  )
};

export default Extra;