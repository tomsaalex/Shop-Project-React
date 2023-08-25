import {useParams} from "react-router";
import {useAuth} from "./AuthProvider";
import {useState} from "react";
import "../css/order-card.css"
import {Link} from "react-router-dom";

export default function OrderCard({orderObject}) {

    const {user, authToken} = useAuth();




    return (
        <>
            <div className="object-card">
                <Link to={`${orderObject._id}`}> <p>{orderObject && orderObject._id}</p></Link>
                <p>{orderObject && orderObject._orderDate}</p>
                <p>{orderObject && orderObject._orderState}</p>
            </div>
        </>
    )
}