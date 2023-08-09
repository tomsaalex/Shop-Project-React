import {useParams} from "react-router";
import {useAPIData} from "./MainBody";
import "../css/product-page.css"
import Header from "./Header";
import {useState} from "react";
import {useAuth} from "./AuthProvider";
let cartId = require('../cart_id.json')["cart-id"];

export default function ProductPage(){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { product_id } = useParams();

    let {user} = useAuth();

    let linkToFetchProduct = `https://dummyjson.com/products/${product_id}`;
    let linkToAddToCart = `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`;

    let element = useAPIData(linkToFetchProduct);

    const productPriceWithDiscount = element && element.price * (100 - element.discountPercentage) / 100;

    let thumbnailsList;
    if(element)
        thumbnailsList = [element.thumbnail, ...element.images];

    function handleCarouselGoBack()
    {
        let newImageIndex = currentImageIndex - 1;
        if(newImageIndex < 0)
            newImageIndex = thumbnailsList.length - 1;
        setCurrentImageIndex(newImageIndex);
    }

    function handleCarouselGoForward()
    {
        let newImageIndex = (currentImageIndex + 1) % thumbnailsList.length;
        setCurrentImageIndex(newImageIndex);
    }

    function addProductToCart()
    {
        if(!element)
            return;

        console.log(element);
        fetch(linkToAddToCart, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Internship-Auth': `${localStorage.getItem('user')}`
            },
            body:JSON.stringify(
                {
                    "products": [
                        {
                            "id": element.id,
                            "quantity": 1
                        }
                    ]
                })
        })
    }

    return (
        <>
            <Header/>
            <div className="item-page-wrapper">
                <div className="item-page">
                    <div className="item-gallery">
                        <img className="gallery-image" alt="thumbnail" src={element && thumbnailsList[currentImageIndex]} />
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
                        <button disabled={!user} onClick={() => addProductToCart()} className="product-add-to-cart-button">Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )

    /*
    return (
        <>
            <div className="item-container" data-id={element && element.id}>
                <div className="carousel-container">
                    <div className="thumbnails-container">
                        {element && element.thumbnailsArray}
                    </div>
                    <div className="nav-arrows">
                        <button className="navigation-button">
                            {"<"}
                        </button>
                        <button className="navigation-button">{">"}</button>
                    </div>
                </div>
                <p className="item-title">{element && element.title}</p>
                <p className="item-description">{element && element.description}</p>
                <div className="item-rating">Rating: <div className="star-rating"
                                                          style={{"--rating": element && element.rating}}></div> {element && element.rating}/5.00
                </div>

                <div className="item-purchase-details">
                    <p className="item-price">Price: <s>${element && element.price}</s> <span
                        style={{color: 'red'}}>${element && productPriceWithDiscount.toFixed(2)}</span></p>
                    <button className="add-to-cart-button">Add To Cart</button>
                </div>
            </div>
        </>
    )*/
}