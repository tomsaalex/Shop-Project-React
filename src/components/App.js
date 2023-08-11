import {Router, Routes, Route} from "react-router";
import Homepage from "./Homepage";
import Login from "./Login";
import Shop from "./Shop";
import ProductPage from "./ProductPage";
import {useEffect, useState} from "react";
import {AuthProvider} from "./AuthProvider";
import Cart from "./Cart";
import Account from "./Account";
import store from './store'
import {Provider} from "react-redux";
import {ProtectedRoute, UnloggedRoute} from "./ProtectedRoute";

export default function App() {


    return (
        <>
            <Provider store={store}>
                <AuthProvider>
                        <Routes>
                            <Route path="/" element={<Homepage/>} />
                            <Route path="/login" element={<UnloggedRoute><Login/></UnloggedRoute>}/>
                            <Route path="/account" element={<ProtectedRoute> <Account/></ProtectedRoute> }/>
                            <Route path="/cart" element={<ProtectedRoute> <Cart/></ProtectedRoute>}/>
                            <Route path="/shop" element={<Shop/>}/>
                            <Route path="/shop/:product_id" element={<ProductPage/>}/>
                        </Routes>
                </AuthProvider>
            </Provider>
        </>
    )
}
