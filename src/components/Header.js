import "../css/header.css"
import {Link} from "react-router-dom";

export default function Header()
{
    return(
        <>
            <h1>AlexT's Magnificent Shop</h1>
            <div className="cart-icon-wrapper">
                <Link to="/cart"><img src={require("../images/shopping-cart-icon.png")} alt="A cart icon."/></Link>
            </div>
        </>
    )
}