import {useState} from "react";
import {debounce} from "../utils/utils";
import "../css/product-card.css"
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";

export default function CartProductCard({ cartId, item, removeCartItem })
{
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();

    const linkToFetch = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`;
    const [quantity, setQuantity] = useState(item['quantity']);
    let addedQuantity = 0;

    function updateAPIQuantity()
    {
        debugger;
        if(quantity + addedQuantity <= 0)
        {
            fetch(`${linkToFetch}?products[]=${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${localStorage.getItem('user')}`
                }
            }).then(() =>
            {
                setQuantity(0);
                removeCartItem(item.id);
            });
        }
        else{

            fetch(linkToFetch, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Internship-Auth': `${localStorage.getItem('user')}`
                },
                body:JSON.stringify(
                    {
                        "products": [
                            {
                                "id": item.id,
                                "quantity": addedQuantity
                            }
                        ]
                    })
            }).then((res) =>
            {
                debugger;
                setQuantity(quantity + addedQuantity);
                return res.json();
            }).then((res) => { dispatch(load(res.data.products))});
        }

    }

    const debounceUpdateAPIQuantity = debounce(updateAPIQuantity, 500);

    function handleMinusButtonClick()
    {
        debugger;
        addedQuantity--;
        debounceUpdateAPIQuantity();
    }

    function handlePlusButtonClick()
    {
        debugger;
        addedQuantity++;
        debounceUpdateAPIQuantity();
    }

    return (
        <>
            <div data-id={item.id} className="cart-item-container">
                <img src={item["thumbnail"]} className="cart-item-thumbnail" alt="a picture of the item"></img>
                <p className="cart-item-title">{item['title']}</p>
                <p className="cart-item-price">${item['price'] * quantity}</p>
                <button onClick={handleMinusButtonClick}>-</button>
                <p className="cart-item-amount">x{quantity}</p>
                <button onClick={handlePlusButtonClick} >+</button>
            </div>
        </>
    )
}