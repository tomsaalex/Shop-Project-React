import Header from "./Header";
import {useAPIData} from "./MainBody";
import {useAuth} from "./AuthProvider";
import {useState} from "react";
import OrderCard from "./OrderCard";

import "../css/orders-page.css"


export default function OrdersPage() {

    const [orders, setOrders] = useState([])
    const {user, authToken} = useAuth();

    if(orders.length === 0) {
        fetch(`http://localhost:3001/users/${user}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': authToken
            }
        }).then(res => res.json())
            .then((res) => {
                setOrders(res.orders)
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Header/>
            <h1>Orders Page</h1>
            <section id="orders-section">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date ordered</th>
                            <th>Order status</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ?
                            orders.map(order => {
                                return (
                                    <OrderCard orderObject={order} key={order._id}/>
                                )
                            }) :
                                <tr><td>No orders to display</td></tr>
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}