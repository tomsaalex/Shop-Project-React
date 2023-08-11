import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Shop from "./components/Shop";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import Account from "./components/Account";
import {ProtectedRoute, UnloggedRoute} from "./components/ProtectedRoute";
import {AuthProvider} from "./components/AuthProvider";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <App/>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
