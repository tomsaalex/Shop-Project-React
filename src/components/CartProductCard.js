import {useState} from "react";
import {debounce} from "../utils/utils";
import "../css/product-card.css"
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";
import {useAddToCartMutation, useRemoveFromCartMutation} from "../api/apiSlice";
import {useAuth} from "./AuthProvider";

export default function CartProductCard({ cartId, item, removeCartItem })
{
    const {user: user, authToken: authToken} = useAuth();
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    const [addToCart, { isLoading }] = useAddToCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    let addedQuantity = 0;

    function updateAPIQuantity()
    {
        if(item['quantity'] + addedQuantity <= 0)
        {
            removeFromCart({userId: user, userToken: authToken, productId:item.number})
        }
        else{
            addToCart({userId: user, userToken: authToken, newProduct: { "number": item.number, "quantity": addedQuantity}})
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