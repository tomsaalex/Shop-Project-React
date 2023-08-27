import {useParams} from "react-router";
import {useAuth} from "./AuthProvider";
import {useState} from "react";
import Header from "./Header";
import "../css/single-order-page.css"

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

    let orderStateClass = "";
    if (orderData && orderData.orderState === "completed")
        orderStateClass = "status-display-completed";
    if (orderData && orderData.orderState === "pending")
        orderStateClass = "status-display-pending";
    if (orderData && orderData.orderState === "canceled")
        orderStateClass = "status-display-canceled";

    return (
        <>
            <Header/>
            <section className="order-page-wrapper">
                <h2>Details of Order: #{orderData && orderData._id}</h2>
                <p className={`general-status-display ${orderStateClass}`}>{orderData && orderData.orderState}</p>

                <div className="order-data-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>ID</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Discounted Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            orderData && orderData.productsCart.products.map(product => {
                                return (
                                    <tr key={product.number}>
                                        <td><img src={product.thumbnail} alt={`${product.title}`} width="60" height="60"/>{product.title}</td>
                                        <td>{product.number}</td>
                                        <td>{product.quantity} {product.quantity === 1 ? "piece" : "pieces"}</td>
                                        <td>${product.total}</td>
                                        <td>${product.discountedTotal.toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }

                        <tr>
                            <td colSpan="2">Order Date: {orderData && new Date(orderData.orderDate).toLocaleString()}</td>
                            <td className="total-price-cell">Total: ${orderData && orderData.productsCart.total}</td>
                            <td colSpan="2" className="discounted-total-price-cell">Discounted Total: ${orderData && orderData.productsCart.discountedTotal.toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="shipping-details">
                        <p>Shipping Address: {orderData && orderData.shippingAddress}</p>
                        <p>Billing Address: {orderData && orderData.billingAddress}</p>
                        <p>Card Number: {orderData && orderData.cardNumber}</p>
                    </div>
                </div>
            </section>

        </>
    )
}