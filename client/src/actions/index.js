import axios from "axios";
import { AUTH_USER } from './types';
import jwt_decode from 'jwt-decode';


//runs before protected backend reqs. Catches token misshaps
//to be run on all protected axios backend reqs
const CheckToken = (dispatch, navigate) => {
  let config = {};
  const token = localStorage.getItem('token') || undefined;
  //if no token 
  if (!token) {
    dispatch(handleSignOut(() => {
      return navigate('/', {replace: true})
    }))
  }
  //asdf asdf

  //check if token has expired
  try {
    const decoded = jwt_decode(token);
    const exp = decoded.exp;
    const currentTime = Date.now() / 1000;

    //handles expired tokens
    if (exp < currentTime) {
      dispatch(handleSignOut(() => {
        return navigate('/login', {replace: true});
      }));
    }
    //sets config so it can be returned to const in another axios funct
    config = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
    //handles errors
  } catch (err) {
    dispatch(handleSignOut(() => {
      return navigate('/', {replace: true});
    }));
  }
  //gives config value to this function
  return config;
};


//gets all jobsites
export async function createJobsite (data, dispatch, navigate, callback) {
  //auth headers for backend verification - checks token 
  const wrappedConfig = CheckToken(dispatch, navigate);

  try {
    //awaits backend response
    axios.post('http://localhost:5000/jobsite', data, wrappedConfig)
      .then(callback());

  //any kind of err returned to add.js
  } catch (err) {
    return err.response.status;
  }
}

export async function getUnPaidProducts(dispatch, navigate) {
  const wrappedConfig = CheckToken (dispatch, navigate);

  return axios.get('http://localhost:5000/products/pay', wrappedConfig)
    .then(function (response) {
      return response.data[0];

    }).catch(function(error) {
      return new Error(error);
    });
};

//handles edit button on pay.js
export async function editPaidProduct(product, dispatch, navigate) {
  const wrappedConfig = CheckToken (dispatch, navigate);
  try {
    return axios.post('http://localhost:5000/products/pay', {id: product}, wrappedConfig)
      .then(response => {
        return response
      }).catch(function(err) {
        return new Error(err);
      });
  } catch(err) {
    return new Error(err);
  }
}

//handles search for extra.js
export async function getExtraProducts(search, dispatch, navigate) {
  const wrappedConfig = CheckToken (dispatch, navigate);

  return axios.get(`http://localhost:5000/extra?search=${search}`, wrappedConfig)
    .then(function(res) {
      //checks to make sure response was successful
      if(res.status !== 200) return new Error('Backend failed to retrive products');

      return res.data.result
    }).catch(error => {
      return new Error(error);
    });
}

//grabs all active jobsites
export async function getJobsites(dispatch, navigate) {
  //auth headers for backend verification
  const headers = CheckToken(dispatch, navigate);

  try {
    //await backend response
    const response = await axios.get('http://localhost:5000/jobsite', headers);
    return response.data;

  } catch (err) {
    return err.response.status;
  };
};

//returns specified products based off search in searchJobsite
export async function getSearchProducts(search, jobsite, dispatch, navigate) {
  const wrappedConfig = CheckToken (dispatch, navigate);

  return axios.get(`http://localhost:5000/jobsite/products?search=${search}&jobsite=${jobsite}`, wrappedConfig)
    .then(function(res) {
      //checks to make sure response was successful
      if(res.status !== 200) return new Error('Backend failed to retrive products');

      return res.data.result
    }).catch(error => {
      return new Error(error);
    });
}

//returns specified jobsite products to redux store
export async function getJobsiteProducts(data, dispatch, navigate) {
  //auth headers for backend verification
  const wrappedConfig = CheckToken (dispatch, navigate);

  return axios.get(`http://localhost:5000/jobsite/products?jobsite=${data}`, wrappedConfig)
    .then(function(res) {
      //checks to make sure response was successful
      if(res.status !== 200) return new Error('Backend failed to retrive products');

      return res.data.result
    }).catch(error => {
      return new Error(error);
    });
};

export const getPayQueryProducts = (query, dispatch, navigate) => {
  const wrappedConfig = CheckToken (dispatch, navigate);

  return axios.get(`http://localhost:5000/products/pay?query=${query}`, wrappedConfig)
    .then(function (response) {
      return response.data[0];
    }).catch(function (error) {
      return new Error(error);
    })
};


//creates product on backend
export async function createProduct(data, dispatch, navigate, callback) {
  //auth headers for backend verification
  const wrappedConfig = CheckToken (dispatch, navigate);

  try {
    axios.post(`http://localhost:5000/product`, data, wrappedConfig)
      .then(null);

  //any kind of err from backend 
  } catch (err) {
  return err.response.status;
  }
}


export async function deleteProduct(productId, dispatch, navigate) {
  const wrappedConfig = CheckToken (dispatch, navigate);

  productId = {
    id: productId
  };

  try{
    const response = await axios.post('http://localhost:5000/product/delete', productId, wrappedConfig);

    if(response.status === 200) {
      return 200;
    } else {
      return alert('Something went wrong, please refresh page');
    }

  } catch (error) {
    console.log(error)
  }
}

export async function editProduct(values, dispatch, navigate) {
  const wrappedConfig = CheckToken (dispatch, navigate);

  console.log('axios');

  try {
    const response = await axios.post('http://localhost:5000/product/edit', values, wrappedConfig);

    if (response.status === 200) {
      return 200;
    } else {
      return alert('Something went wrong, please refresh page');
    }
  } catch (error) {
    console.log(error)
  }
}

//login async function
export async function handleLogIn(data, dispatch) {
  try {
      const response = await axios.post('http://localhost:5000/login', data);
      
      //if success from backend
      if (!response.data.error) {
        
        //set token the dispatch to store
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER, payload: response.data });
        return 201;
      }
  
  //any kind of err caught and categorized by signUp.js
  } catch (err) {
    return err.response.status;
  }
}

//signout logic
export const handleSignOut = (callback) => dispatch =>{
  localStorage.removeItem('token');

  //let redux state know there isn't a user
  dispatch({ type: AUTH_USER, payload: '' });
  callback();
}