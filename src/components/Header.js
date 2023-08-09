import "../css/header.css"
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";

export default function Header()
{
    let { user, login, logout } = useAuth();

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

        </>
    )
}