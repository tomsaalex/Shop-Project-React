import {useParams} from "react-router";
import {useAPIData} from "./MainBody";


export default function ProductPage(){
    const { product_id } = useParams();

    let linkToFetch = `https://dummyjson.com/products/${product_id}`;
    let element = useAPIData(linkToFetch);
    const productPriceWithDiscount = element && element.price * (100 - element.discountPercentage) / 100;

    return (
        <>

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