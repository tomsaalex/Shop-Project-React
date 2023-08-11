import {useState} from "react";
import {debounce} from "../utils/utils";
import "../css/product-card.css"
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";
import {useAddToCartMutation, useRemoveFromCartMutation} from "../api/apiSlice";

export default function CartProductCard({ cartId, item, removeCartItem })
{
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    const [addToCart, { isLoading }] = useAddToCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();

    const linkToFetch = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`;
    let addedQuantity = 0;

    function updateAPIQuantity()
    {
        if(item['quantity'] + addedQuantity <= 0)
        {
            // fetch(`${linkToFetch}?products[]=${item.id}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Internship-Auth': `${localStorage.getItem('user')}`
            //     }
            // })

            removeFromCart(item.id)
                    //.then(() =>
                    //{
                    //    removeCartItem(item.id);
                    //});
        }
        else{

            //fetch(linkToFetch, {
            //    method: 'PUT',
            //    headers: {
            //        'Content-Type': 'application/json',
            //        'Internship-Auth': `${localStorage.getItem('user')}`
            //    },
            //    body:JSON.stringify(
            //        {
            //            "products": [
            //                {
            //                    "id": item.id,
            //                    "quantity": addedQuantity
            //                }
            //            ]
            //        })
            //})
                addToCart({ "id": item.id, "quantity": addedQuantity})
            //.then((res) =>
            //{
            //    console.log("Rez", res);
            //    setQuantity(quantity + addedQuantity);
            //    return res.json();
            //}).then((res) => { dispatch(load(res.data.products))});
        }
    }

    const debounceUpdateAPIQuantity = debounce(updateAPIQuantity, 500);

    function handleMinusButtonClick()
    {
        addedQuantity--;
        debounceUpdateAPIQuantity();
    }

    function handlePlusButtonClick()
    {
        addedQuantity++;
        debounceUpdateAPIQuantity();
    }

    return (
        <>
            <div data-id={item.id} className="cart-item-container">
                <img src={item["thumbnail"]} className="cart-item-thumbnail" alt="a picture of the item"></img>
                <p className="cart-item-title">{item['title']}</p>
                <p className="cart-item-price">${item['price'] * item['quantity']}</p>
                <button onClick={handleMinusButtonClick}>-</button>
                <p className="cart-item-amount">x{item['quantity']}</p>
                <button onClick={handlePlusButtonClick} >+</button>
            </div>
        </>
    )
}