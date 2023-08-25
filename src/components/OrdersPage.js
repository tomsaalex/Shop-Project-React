import Header from "./Header";
import {useAPIData} from "./MainBody";
import {useAuth} from "./AuthProvider";
import {useState} from "react";
import OrderCard from "./OrderCard";


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
                {
                    orders.length > 0 ?
                    orders.map(order => {
                        return (
                            <OrderCard orderObject={order} key={order._id}/>
                        )
                    }) :
                    <p>No orders to display</p>
                }
            </section>
        </>
    )
}