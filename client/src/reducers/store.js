import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'


export default configureStore({
  reducer: {
    null: null
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
});