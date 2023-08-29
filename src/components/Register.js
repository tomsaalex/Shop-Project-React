import Header from "./Header";
import "../css/register.css"

export default function Register() {
    return (
        <>
            <Header/>
            <h2>Register</h2>

            <section className="register-form-wrapper">
                <form className="register-form">
                    <label>
                        Full Name<br/>
                        <input type="text" id="full-name" name="full-name" placeholder="Full Name" required/><br/>
                    </label>
                    <label>
                        Email<br/>
                        <input type="email" id="email" name="email" placeholder="Email" required/><br/>
                    </label>
                    <label>
                        Password<br/>
                        <input type="password" id="password" name="password" placeholder="Password" required/><br/>
                    </label>
                    <label>
                        Confirm Password<br/>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required/><br/>
                    </label>
                    <input type="submit" value="Register"/>
                </form>
            </section>
        </>
    )
}