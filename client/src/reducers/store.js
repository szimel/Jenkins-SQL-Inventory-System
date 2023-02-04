import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import authReducer from './auth';
// import currentUserReducer from './current-user';
import jobsiteProductReducer from './jobsiteProductReducer';
import selectedJobsiteReducer from './jobsites';
import productReducer from './product';


export default configureStore({
  reducer: {
    product: productReducer,
    products: jobsiteProductReducer,
    jobsite: selectedJobsiteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});