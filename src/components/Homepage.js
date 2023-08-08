import "../css/homepage.css"
import {Link} from "react-router-dom";

export default function Homepage(){
    return (
        <>
            <div className="page-wrapper">
                <div className="wallpaper-wrapper">
                    <h1 className="title-wrapper">Welcome one and all to the magnificent<br/><span className="bigger-text">shop of AlexT</span></h1>
                    <Link to="/shop"><button className="shop-button">Shop Now</button></Link>
                </div>
            </div>
        </>
    )
}