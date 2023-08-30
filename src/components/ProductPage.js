import {useParams} from "react-router";
import {useAPIData} from "./MainBody";
import "../css/product-page.css"
import Header from "./Header";
import {useState} from "react";
import {useAuth} from "./AuthProvider";
import {useDispatch, useSelector} from "react-redux";
import {load} from "./cartSlice";
import {
    useAddToCartMutation,
    useAddReviewToProductMutation,
    useGetReviewsForProductQuery,
    useGetSingleStoreProductQuery
} from "../api/apiSlice";
import ReviewCard from "./ReviewCard";

export default function ProductPage() {

    const cart = useSelector(state => state.cart.value),
        {
            user,
            authToken
        } = useAuth(),
        [addToCart] = useAddToCartMutation(),
        [currentImageIndex, setCurrentImageIndex] = useState(0),
        {product_id} = useParams();

    const [addReviewToProduct, addReviewResponse] = useAddReviewToProductMutation();

    const {
        data: element, isLoading, isSuccess, isError, error
    } = useGetSingleStoreProductQuery(product_id);

    const productPriceWithDiscount = element && element.price * (100 - element.discountPercentage) / 100;

    let thumbnailsList;
    if (element && element.thumbnail && element.images) thumbnailsList = [element.thumbnail, ...element.images];


    const {
        data: reviewsData,
        isLoading: reviewsLoading,
        isSuccess: reviewsSuccess,
        isError: reviewsError,
        error: reviewsErrorObject
    } = useGetReviewsForProductQuery(product_id);

    let reviewsListContent;


    if (reviewsSuccess) {
        reviewsListContent = reviewsData.map((review) => {
            return (<ReviewCard reviewObject={review} key={review._id}></ReviewCard>)
        });
    }
    if (reviewsLoading) {
        reviewsListContent = <p>Loading...</p>
    }
    if (reviewsError) {
        reviewsListContent = <p>{reviewsErrorObject.toString()}</p>
    }

    function handleCarouselGoBack() {
        let newImageIndex = currentImageIndex - 1;
        if (newImageIndex < 0) newImageIndex = thumbnailsList.length - 1;
        setCurrentImageIndex(newImageIndex);
    }

    function handleCarouselGoForward() {
        let newImageIndex = (currentImageIndex + 1) % thumbnailsList.length;
        setCurrentImageIndex(newImageIndex);
    }

    function addProductToCart() {
        if (!element) return;

        addToCart({
            userId: user, userToken: authToken, newProduct: {
                "id": element.number, "quantity": 1
            }
        });
    }

    function onFormSubmit(e) {
        e.preventDefault();

        const form = e.target,
            title = form[0].value,
            comment = form[1].value,
            rating = form[2].value;

        const reviewData = {
            "title": title,
            "comment": comment,
            "rating": rating
        }

        if (title.length === 0 || comment.length === 0 || rating.length === 0) {
            alert("Please fill in all the fields");
            return;
        }

        addReviewToProduct({user, authToken, productId: product_id, review: reviewData})
            .unwrap()
            .then((payload) => {alert("Review added successfully")})
            .catch((err) => {alert(err.data)});
    }

    return (<>
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
                    <button disabled={!user} onClick={addProductToCart} className="product-add-to-cart-button">Add
                        To Cart
                    </button>
                </div>
            </div>
        </div>

        <section className="reviews-section">
            <div className="review-form-wrapper">
                <form className="review-form" onSubmit={onFormSubmit}>
                    <label>
                        Title:<br/>
                        <input type="text" name="title"/><br/>
                    </label>
                    <label>
                        Comment:<br/>
                        <textarea name="comment"/><br/>
                    </label>
                    <label>
                        Rating:<br/>
                        <input type="number" name="rating" step="0.1"  min="0" max="5"/><br/>
                    </label>
                    <input type="submit" value="Post Review"/><br/>
                </form>
            </div>
            <div className="reviews-list-wrapper">
                {reviewsListContent}
            </div>
        </section>

    </>)
}