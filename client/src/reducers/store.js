import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './auth';
import currentUserReducer from './current-user';
import validationReducer from './validation';


export default configureStore({
  reducer: {
    validation: validationReducer,
    auth: authReducer,
    currentUser: currentUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});