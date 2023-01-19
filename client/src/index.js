import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux'
import store from './reducers/store';
import './components/app.css';
import { AuthProvider } from './components/auth/authProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);


