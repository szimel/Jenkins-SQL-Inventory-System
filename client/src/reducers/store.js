import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import validationReducer from './validation';


export default configureStore({
  reducer: {
    validation: validationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});