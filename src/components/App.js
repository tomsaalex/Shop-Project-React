import {Router, Routes, Route} from "react-router";
import Homepage from "./Homepage";
import Login from "./Login";
import Store from "./Store";
import ProductPage from "./ProductPage";
import {useEffect, useState} from "react";
import {AuthProvider} from "./AuthProvider";
import Cart from "./Cart";
import {CartProvider} from "./CartContext";
import Account from "./Account";

export default function App() {


    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<Homepage/>} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/account" element={<Account/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/shop" element={<Store/>}/>
                        <Route path="/shop/:product_id" element={<ProductPage/>}/>
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </>
    )
}
