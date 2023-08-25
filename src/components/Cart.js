import "../css/cart.css"
import {useAPIData} from "./MainBody";
import {useEffect, useState} from "react";
import CartProductCard from "./CartProductCard";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";


import {useGetCartProductsQuery} from "../api/apiSlice";
import {useAuth} from "./AuthProvider";
import {Link} from "react-router-dom";

const cartId = require("../cart_id.json")["cart-id"];

export default function Cart() {
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    const {user: user, authToken: authToken} = useAuth();
    let totalPrice = 0;

    function removeCartItem(id) {
        let newCartData = cart.filter(item => item.id !== id);
        dispatch(load(newCartData));
    }


    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCartProductsQuery({userId: user, userToken: authToken});

    let content;

    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = posts.products.map((item) => <CartProductCard cartId={cartId} key={item._id} item={item}
                                                                removeCartItem={removeCartItem}/>);
        totalPrice = posts.total;
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }


    return (
        <>
            <Header/>
            <header>
                <h1>Cart Details</h1>
            </header>
            <main>
                <div className="cart-wrapper">
                    <div id="products-list-cart">
                        {content}
                    </div>
                </div>

                {/*<img src="../public/images/loading_gif.gif" className="loader hidden-attribute" alt="loader"></img>*/}
                <div className="checkout-elements">
                    <p id="total-text">Total: ${totalPrice}</p>
                    <Link to="/checkout">
                        <button id="buy-button" >Go to Checkout!
                        </button>
                    </Link>
                </div>
            </main>
        </>
    )
}