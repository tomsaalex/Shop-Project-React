import "../css/account.css"
import Header from "./Header";

export default function Account()
{
    return (
        <>
            <Header/>
            <h1>User Profile</h1>
            <div className="user-data">
                <p>Name: Tomsa Alexandru Eduard</p>
                <p>Email: test5@mail.com</p>
                <p>Phone: +407** *** ***</p>
                <p>Shipping address: Europe, Romania, Cluj, Cluj-Napoca....</p>
            </div>
        </>
    )
}