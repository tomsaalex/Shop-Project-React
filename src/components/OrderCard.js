import {useParams} from "react-router";
import {useAuth} from "./AuthProvider";
import {useState} from "react";
import "../css/order-card.css"
import {Link} from "react-router-dom";

export default function OrderCard({orderObject}) {

    const {user, authToken} = useAuth();


    let parsedDateString = orderObject && new Date(orderObject._orderDate).toLocaleString();

    return (
        <>
            <tr className="object-card">
                <td><Link to={`${orderObject._id}`}>{orderObject && orderObject._id}</Link></td>
                <td>{orderObject && parsedDateString}</td>
                <td>{orderObject && orderObject._orderState}</td>
                <td>${orderObject && orderObject._productsCart._total}</td>
            </tr>
        </>
    )
}