import {useParams} from "react-router";
import {useAPIData} from "./MainBody";
import "../css/product-page.css"
import Header from "./Header";
import {useState} from "react";
import {useAuth} from "./AuthProvider";
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";
import {useAddToCartMutation, useGetSingleStoreProductQuery} from "../api/apiSlice";

export default function ProductPage() {

    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    let {userId, userToken} = useAuth();

    const [addToCart] = useAddToCartMutation();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const {product_id} = useParams();

    const {
        data: element,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSingleStoreProductQuery(product_id);

    const productPriceWithDiscount = element && element.price * (100 - element.discountPercentage) / 100;

    let thumbnailsList;
    if (element && element.thumbnail && element.images)
        thumbnailsList = [element.thumbnail, ...element.images];

    function handleCarouselGoBack() {
        let newImageIndex = currentImageIndex - 1;
        if (newImageIndex < 0)
            newImageIndex = thumbnailsList.length - 1;
        setCurrentImageIndex(newImageIndex);
    }

    function handleCarouselGoForward() {
        let newImageIndex = (currentImageIndex + 1) % thumbnailsList.length;
        setCurrentImageIndex(newImageIndex);
    }

    function addProductToCart() {
        if (!element)
            return;

        addToCart(
            {
                userId,
                userToken,
                newProduct: {
                    "id": element.id,
                    "quantity": 1
                }
            }
        );
    }

    return (
        <>
            <Header/>
            <div className="item-page-wrapper">
                <div className="item-page">
                    <div className="item-gallery">
                        <img className="gallery-image" alt="thumbnail"
                             src={element && thumbnailsList[currentImageIndex]}/>
                        <div className="nav-arrows">
                            <button onClick={handleCarouselGoBack} className="navigation-button">
                                {"<"}
                            </button>
                            <button onClick={handleCarouselGoForward} className="navigation-button">{">"}</button>
                        </div>
                    </div>
                    <hr className="dividing-line"/>
                    <div className="item-info">
                        <h1>{element && element.title}</h1>
                        <h2 className="item-description">{element && element.description}</h2>
                        <h3>Category:<br/>{element && element.category}</h3>
                        <h3>Brand:<br/>{element && element.brand}</h3>
                        <span className="star-rating" style={{"--rating": element && element.rating}}></span>
                        <div className="item-price-wrapper">
                            <p>${element && productPriceWithDiscount.toFixed(2)}</p>
                            <p><s>${element && element.price.toFixed(2)}</s></p>
                        </div>
                        <button disabled={!userId} onClick={addProductToCart} className="product-add-to-cart-button">Add
                            To Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}