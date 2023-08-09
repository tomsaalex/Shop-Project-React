import {useState} from "react";
import {debounce} from "../utils/utils";
import "../css/cart-panel-product-card.css"

export default function CartPanelProductCard({item})
{
    return (
        <>
            <div data-id={item.id} className="cart-panel-item-container">
                <img src={item["thumbnail"]} className="cart-item-thumbnail" alt="a picture of the item"></img>
                <p className="cart-panel-item-title">{item['title']}</p>
                <p className="cart-panel-item-price">${item['price'] * item['quantity']}</p>
                <p className="cart-panel-item-amount">x{item['quantity']}</p>
            </div>
        </>
    )
}