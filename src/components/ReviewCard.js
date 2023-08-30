import "../css/review-card.css"
import {useAuth} from "./AuthProvider";
import {useRemoveReviewFromProductMutation} from "../api/apiSlice";

export default function ReviewCard({reviewObject}) {

    const {user, authToken} = useAuth();
    const [removeReviewFromProduct, { isLoading }] = useRemoveReviewFromProductMutation();

    function deleteReview()
    {
        console.log("delete review");
        removeReviewFromProduct({userId: user, userToken: authToken, reviewId: reviewObject._id})
    }

    return (
        <>
            <div className="review-card-wrapper">
                <p>{reviewObject.title}</p>
                <p>{reviewObject.comment}</p>
                <p>{reviewObject.rating}/5.0 <span className="yellow-star">★</span></p>
                {user === reviewObject.userId && <button onClick={deleteReview}>Delete</button>}
            </div>
        </>
    )

}