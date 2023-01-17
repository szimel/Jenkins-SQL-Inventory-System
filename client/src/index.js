import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/home';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux'
import store from './reducers/store';
import './components/app.css';
import { AuthProvider } from './components/auth/authProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Unauthorized from './components/auth/unauthorized';
import ProtectedRoutes from './components/protected routes/protectedRoutes';
import LogIn from './components/SignUp-LogIn/logIn';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='login' element={<LogIn />} />
          </Routes>
          <ProtectedRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

