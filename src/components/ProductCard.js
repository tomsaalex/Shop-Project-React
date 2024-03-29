import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";
import {useAddToCartMutation} from "../api/apiSlice";
const cartId = require('../cart_id.json')["cart-id"];

export default function ProductCard({productObject})
{
    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();

    const {user: user, authToken: authToken} = useAuth();

    const [addToCart] = useAddToCartMutation();
    const productPriceWithDiscount = productObject.price * (100 - productObject.discountPercentage) / 100;

    let imageLinks = [productObject.thumbnail, ...productObject["images"]];


    let thumbnailsArray = imageLinks.map((imgLink, index) =>
    {
        if(index === 1)
            return <img key={index} className="item-thumbnail" src={imgLink} alt="thumbnail" loading="lazy" />
        else
            return <img key={index} className="item-thumbnail" src={imgLink} alt="thumbnail" loading="lazy"
                        style={{display: "none"}}/>
    });

    function addProductToCart(product)
    {
        addToCart({userId: user, userToken: authToken, newProduct:{
            "id": product.number,
            "quantity": 1
        }});
    }

    function handleClick(e)
    {
        const addToCartButton = e.target;

        addToCartButton.textContent = "Added to cart";
        addToCartButton.classList.add('pressed-add-to-cart-button');

        addProductToCart(productObject);

        setTimeout(function (){
            addToCartButton.textContent = "Add to cart";
            addToCartButton.classList.remove('pressed-add-to-cart-button');
            addToCartButton.disabled = false;
        }, 4000);
    }

    return(
            <div className="item-container" data-id={productObject.id}>
                <div className="thumbnail-container">
                    <img className="item-thumbnail" src={productObject.thumbnail} alt="thumbnail" loading="lazy" />
                </div>
                <Link to={`/shop/${productObject.number}`}><p className="item-title">{productObject.title}</p></Link>
                <p className="item-description">{productObject.description}</p>
                <div className="item-rating">Rating:
                    <div className="star-rating" style={{"--rating": productObject.rating}}></div> {productObject.rating}/5.00
                </div>

                <div className="item-purchase-details">
                    <p className="item-price">Price: <s>${productObject.price}</s> <span
                        style={{color: 'red'}}>${productPriceWithDiscount.toFixed(2)}</span></p>
                    <button disabled={!user} onClick={handleClick} className="add-to-cart-button">Add To Cart</button>
                </div>
            </div>
    )
}