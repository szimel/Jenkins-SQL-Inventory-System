import React, { useContext, useEffect, useState } from 'react';
import { getJobsiteProducts, getSearchProducts } from '../../../actions';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCards from './productCards';
import DisplayJobs from '../displayJobs';

const SearchJobsite = () => {
  //for axios token check
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //global var that holds the products that were searched.
  const [products, setProducts] = useState(null);

  //sets when to show the search bar
  const [searchBar, setSearchBar] = useState(false);

  //grabs value of searched thing
  const [search, setSearch] = useState('');


  //sets jobsite from jsx file
  const selectedJobsite = useSelector(state => state);

  // gets data from backend from jobsite dropdown
  async function getProducts() {
    //makes search bar pop up
    setSearchBar(true);

    //sets jobsite from <dispalyJobs>
    const data = selectedJobsite.jobsite.id;

    //dispatch that returns correct jobID for products to be in redux store
    await getJobsiteProducts(data, dispatch, navigate)
      .then(response => {
        //grabs response from getjobsiteProducts and sets it as global var
        setProducts(response);

      }).catch(function(err) {
        new Error('handleSubmit error')
        return new Error(err);
      })
  };

  //handles user searches
  async function getSearchProduct() {
    //sets jobsite from <dispalyJobs>
    const data = selectedJobsite.jobsite.id;

    await getSearchProducts(search, data, dispatch, navigate)
    .then(response => {
      //grabs response from getjobsiteProducts and sets it as global var
      setProducts(response);

    }).catch(function(err) {
      new Error('handleSubmit error')
      return new Error(err);
    })
  }
  

  return(
    <>
      <div className="container-fluid search-container">
          <DisplayJobs />
          <button type='submit' className='btn btn-dark' onClick={() => getProducts()}>Search</button>
      </div>
      {searchBar && (
        <div>
          <label>Search: </label>
          <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') getSearchProduct(true)}} />
          <button type="submit" onClick={() => getSearchProduct(true)}>Search</button>
        </div>
      )}
      <div className='container-fluid'>
        <div className='container-products'>
          <ProductCards products={products} getProducts={getProducts}/>
        </div>
      </div>
    </>
  );
};



export default SearchJobsite;