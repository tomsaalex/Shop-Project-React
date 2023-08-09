import "../css/header.css"
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {createContext, useEffect, useState} from "react";
import CartProductCard from "./CartProductCard";
import CartPanelProductCard from "./CartPanelProductCard";
const cartId = require('../cart_id.json')["cart-id"];

export default function Header({ refrehCartPanel, setRefreshCartPanel })
{
    let { user, login, logout } = useAuth();
    let timerUntilPanelClose;

    const linkToFetch = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`;
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        if(refrehCartPanel === true)
            setRefreshCartPanel(false);
        fetch(linkToFetch, {
            method: 'GET',
            headers: {'Internship-Auth': `${localStorage.getItem('user')}`}
        })
            .then((res) => {return res.json()})
            .then((data) => { setCartData(data.products); setTotalPrice(data.total)});
    }, [linkToFetch, refrehCartPanel]);

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
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="cart-panel" className="hidden-element">
                        {cartData.map((product) => <CartPanelProductCard item={product} />)}
                    </div>
                </div>
            </div>
        </>
    )
}