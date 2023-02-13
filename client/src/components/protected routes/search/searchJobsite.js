import React, { useContext, useEffect, useState } from 'react';
import { getJobsiteProducts } from '../../../actions';
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

  // //re renders product cards on edit submit
  // useEffect(() => {
  //   handleSubmit();
  // }, [reRender]);


  //sets jobsite from jsx file
  const selectedJobsite = useSelector(state => state);

  // gets data from backend from jobsite dropdown
  async function getProducts() {

    //sets jobsite from other jsx file
    const data = selectedJobsite.jobsite.id;

    //dispatch that returns correct jobID for products to be in redux store
    await getJobsiteProducts(data, dispatch, navigate)
      .then(response => {
        console.log('first');
        console.log(response[0])
        //grabs response from getjobsiteProducts and sets it as global var
        setProducts(response);

      }).catch(function(err) {
        new Error('handleSubmit error')
        return new Error(err);
      })
  };
  

  return(
    <>
      <div className="container-fluid search-container">
          <DisplayJobs />
          <button type='submit' className='btn btn-dark' onClick={() => getProducts()}>Search</button>
      </div>
      <div className='container-fluid'>
        <div className='container-products'>
          <ProductCards products={products} getProducts={getProducts}/>
        </div>
      </div>
    </>
  );
};



export default SearchJobsite;