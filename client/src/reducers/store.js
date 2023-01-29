import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './auth';
import currentUserReducer from './current-user';
import jobsiteProductReducer from './jobsiteProductReducer';


export default configureStore({
  reducer: {
    products: jobsiteProductReducer,
    auth: authReducer,
    currentUser: currentUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});