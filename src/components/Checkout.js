import Header from "./Header";
import "../css/checkout.css"
import {useAuth} from "./AuthProvider";
import {useNavigate} from "react-router";

export default function Checkout() {

    const {user, authToken} = useAuth();
    const navigate = useNavigate();

    function onFormSubmit(e) {
        e.preventDefault();

        const shippingAddress = e.target[0].value;
        const billingAddress = e.target[1].value;
        const cardNumber = e.target[2].value;
        const expirationDate = e.target[3].value;
        const cvv = e.target[4].value;

        const orderData = {
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cvv: cvv
        }

        const linkToFetch = `http://localhost:3001/users/${user}/orders`;

        fetch(linkToFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authToken
            },
            body: JSON.stringify(orderData)
        }).then(res => {
            alert("Order placed successfully");

            setTimeout(() => {
                navigate('/shop');
            }, 3000);
        }).catch(err => {
            alert("Error while placing order: " + err);
        });
    }

    return (
        <>
            <Header/>
            <h1>Checkout</h1>

            <section id="ordering-section">
                <div id="checkout-form-wrapper">
                    <h2>Shipping & Billing Details</h2>
                    <form id="checkout-form" onSubmit={onFormSubmit}>
                        <label>
                            Shipping Address:<br/>
                            <input size="60" type="text"/><br/>
                        </label>
                        <label>
                            Billing Address:<br/>
                            <input size="60" type="text"/><br/>
                        </label>
                        <label>
                            Card Number:<br/>
                            <input maxLength="16" type="text"/><br/>
                        </label>
                        <label>
                            Expiration Date:<br/>
                            <input maxLength="5" type="text"/><br/>
                        </label>
                        <label>
                            CVV:<br/>
                            <input maxLength="3" type="password"/><br/>
                        </label>
                        <input type="submit" value="Place Order"></input>
                    </form>
                </div>
                <div id="checkout-details-wrapper">

                </div>
            </section>
        </>
    )
}