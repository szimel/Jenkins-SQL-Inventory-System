import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store from './reducers/store';
import Inventory from './components/inventory';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/inventory',
    element: <Inventory />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
    />
  </Provider>
);

