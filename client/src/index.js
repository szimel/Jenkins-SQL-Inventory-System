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
import SignUp from './components/SignUp-LogIn/signUp';
import LogIn from './components/SignUp-LogIn/logIn';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/inventory',
    element: <Inventory />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <LogIn />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
    />
  </Provider>
);

