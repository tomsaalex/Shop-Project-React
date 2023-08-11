import "../css/header.css"
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {createContext, useEffect, useState} from "react";
import CartPanelProductCard from "./CartPanelProductCard";
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";
import {useGetCartProductsQuery} from "../api/apiSlice";
import CartProductCard from "./CartProductCard";
const cartId = require('../cart_id.json')["cart-id"];

export default function Header()
{
    let { user, login, logout } = useAuth();
    let timerUntilPanelClose;

    const cart = useSelector(state => state.cart.value);

    const dispatch = useDispatch();

    const linkToFetch = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`;
    //const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    let totalItems = 0;

    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCartProductsQuery();

    let content;

    if(isLoading)
    {
        content = <p>Loading...</p>
    }
    else if(isSuccess)
    {
        totalItems = posts.totalQuantity;
        content = posts.products.map((product) => <CartPanelProductCard key={product.id} item={product} />);
    }
    else if(isError)
    {
        content = <div>{error.toString()}</div>
    }


    function handleMouseEnter()
    {
        clearTimeout(timerUntilPanelClose);
        let cartPanel = document.getElementById("cart-panel");
        cartPanel.classList.remove('hidden-element');
    }

    function handleMouseLeave()
    {
        clearTimeout(timerUntilPanelClose);
        timerUntilPanelClose = setTimeout(() =>{
            let cartPanel = document.getElementById("cart-panel");
            cartPanel.classList.add('hidden-element');
        }, 700);
    }

    return(
        <>
            <nav>
                <ul className="main-nav-bar">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/account">Account</Link></li>
                    {user ? <li onClick={logout}>Logout</li> : <li><Link to="/login">Login</Link></li>}
                </ul>
            </nav>
            <div className="cart-icon-bar">
                <div className="cart-panel-wrapper">
                    <img id="cart-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} src={require('../images/shopping-cart-icon.png')} alt="Shopping cart icon"/>
                    <div className="counter-bubble">
                        <p>{totalItems}</p>
                    </div>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="cart-panel" className="hidden-element">
                        {content}
                    </div>
                </div>
            </div>
        </>
    )
}