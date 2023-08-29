import "../css/review-card.css"

export default function ReviewCard({reviewObject}) {

    return (
        <>
            <div className="review-card-wrapper">
                <p>{reviewObject.title}</p>
                <p>{reviewObject.comment}</p>
                <p>{reviewObject.rating}/5.0 <span className="yellow-star">★</span></p>
            </div>
        </>
    )

}