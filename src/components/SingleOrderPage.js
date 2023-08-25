import {useParams} from "react-router";
import {useAuth} from "./AuthProvider";
import {useState} from "react";

export default function SingleOrderPage()
{
    const {user, authToken} = useAuth();
    const {order_id: orderId} = useParams();


    const [orderData, setOrderData] = useState();

    fetch(`http://localhost:3001/users/${user}/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Internship-Auth': authToken
        }
    })
        .then((res) => res.json())
        .then((res) => {
            if (!orderData) {
                setOrderData(res.order);
            }
        });


    return (
        <>
            <h1>SingleOrderPage</h1>

            <div className="order-data-container">
                {console.log(orderData)}
                <p>Order ID: {orderData && orderData._id}</p>
                <p>Order Date: {orderData && orderData.orderDate}</p>
                <p>Order State: {orderData && orderData.orderState}</p>
                <p>Shipping Address: {orderData && orderData.shippingAddress}</p>
                <p>Billing Address: {orderData && orderData.billingAddress}</p>
                <p>Card Number: {orderData && orderData.cardNumber}</p>
                <p>Expiration Date: {orderData && orderData.expirationDate}</p>
                <p>CVV: {orderData && orderData.cvv}</p>
                <p>Total: {orderData && orderData.productsCart.total}</p>
            </div>
        </>
    )
}