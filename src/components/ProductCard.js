import {Link} from "react-router-dom";

export default function ProductCard({productObject})
{
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

    function handleClick()
    {

    }

    return(
            <div onClick={handleClick} className="item-container" data-id={productObject.id}>
                <div className="carousel-container">
                    <div className="thumbnails-container">
                        {thumbnailsArray}
                    </div>
                    <div className="nav-arrows">
                        <button className="navigation-button">
                            {"<"}
                        </button>
                        <button className="navigation-button">{">"}</button>
                    </div>
                </div>
                <Link to={`/shop/${productObject.id}`}><p className="item-title">{productObject.title}</p></Link>
                <p className="item-description">{productObject.description}</p>
                <div className="item-rating">Rating: <div className="star-rating"
                                                          style={{"--rating": productObject.rating}}></div> {productObject.rating}/5.00
                </div>

                <div className="item-purchase-details">
                    <p className="item-price">Price: <s>${productObject.price}</s> <span
                        style={{color: 'red'}}>${productPriceWithDiscount.toFixed(2)}</span></p>
                    <button className="add-to-cart-button">Add To Cart</button>
                </div>
            </div>
    )
}