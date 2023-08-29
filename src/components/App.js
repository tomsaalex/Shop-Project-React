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
import Checkout from "./Checkout";
import OrdersPage from "./OrdersPage";
import SingleOrderPage from "./SingleOrderPage";
import Register from "./Register";

export default function App() {


    return (
        <>
            <Provider store={store}>
                <AuthProvider>
                        <Routes>
                            <Route path="/" element={<Homepage/>} />
                            <Route path="/login" element={<UnloggedRoute><Login/></UnloggedRoute>}/>
                            <Route path="/register" element={<UnloggedRoute><Register/></UnloggedRoute>}/>
                            <Route path="/account" element={<ProtectedRoute> <Account/></ProtectedRoute> }/>
                            <Route path="/cart" element={<ProtectedRoute> <Cart/></ProtectedRoute>}/>
                            <Route path="/orders" element={<ProtectedRoute> <OrdersPage/> </ProtectedRoute>}/>
                            <Route path="/checkout" element={<ProtectedRoute> <Checkout/></ProtectedRoute>}/>
                            <Route path="/shop" element={<Shop/>}/>
                            <Route path="/orders" element={<ProtectedRoute> <Shop/> </ProtectedRoute>}/>
                            <Route path="/shop/:product_id" element={<ProductPage/>}/>
                            <Route path="/orders/:order_id" element={<ProtectedRoute> <SingleOrderPage/> </ProtectedRoute>}/>
                        </Routes>
                </AuthProvider>
            </Provider>
        </>
    )
}
