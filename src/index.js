import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Store from "./components/Store";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import Account from "./components/Account";
import {ProtectedRoute, UnloggedRoute} from "./components/ProtectedRoute";
import {AuthProvider} from "./components/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={<Homepage/>} />
                  <Route path="/login" element={<UnloggedRoute><Login/></UnloggedRoute>}/>
                  <Route path="/shop" element={<Store/>}/>
                  <Route path="/shop/:product_id" element={<ProductPage/>}/>
                  <Route path={"/account"} element={<Account />}/>
                  <Route path={"/cart"} element={<Cart />}/>
              </Routes>
          </AuthProvider>
      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
