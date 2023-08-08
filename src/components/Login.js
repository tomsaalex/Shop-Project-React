import {useState} from "react";
import {useAuth} from "./AuthProvider";
export default function Login()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { user, login, logout } = useAuth();

    function onLogin(e) {
        e.preventDefault();
        const loginData = {
            email: username,
            password: password
        }

        fetch("http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(res => {login(res.token)});

        return false;
    }

    return (
        <>
                <form>
                    <label>
                        Username:<br/>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" /><br/>
                    </label>
                    <label>
                        Password:<br/>
                        <input onChange={(e) => setPassword(e.target.value)} type="password"/><br/>
                    </label>
                    <button onClick={onLogin}>Login</button>
                </form>
        </>
    )
}