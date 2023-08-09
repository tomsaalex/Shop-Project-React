import "../css/cart.css"
import {useAPIData} from "./MainBody";
import {useEffect, useState} from "react";
import CartProductCard from "./CartProductCard";
import Header from "./Header";
const cartId = require("../cart_id.json")["cart-id"];

export default function Cart()
{
    const linkToFetch = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`;
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch(linkToFetch, {
            method: 'GET',
            headers: {'Internship-Auth': `${localStorage.getItem('user')}`}
        })
            .then((res) => {return res.json()})
            .then((data) => { setCartData(data.products); setTotalPrice(data.total)});
    }, [linkToFetch]);

    function removeCartItem(id)
    {
        let newCartData = cartData.filter(item => item.id !== id);
        setCartData(newCartData);
    }

    return (
        <>
            <Header/>
            <header>
                <h1>Checkout</h1>
            </header>
            <main>
                <div className="cart-wrapper">
                    <div id="products-list-cart">
                        {cartData.map((item) => <CartProductCard cartId={cartId} key={item.id} item={item} removeCartItem={removeCartItem}/>)}
                    </div>
                </div>

                {/*<img src="../public/images/loading_gif.gif" className="loader hidden-attribute" alt="loader"></img>*/}
                <div className="checkout-elements">
                    <p id="total-text">Total: ${totalPrice}</p>
                    <button id="buy-button" onClick={() => {alert('Transaction successful! We hope to see you again soon!')}}>Buy!</button>
                </div>

            </main>
        </>
    )
}