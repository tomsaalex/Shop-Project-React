
export default function Login()
{
    return (
        <>
            <form>
                <label>
                    Username:<br/>
                    <input type="text" /><br/>
                </label>
                <label>
                    Password:<br/>
                    <input type="password"/><br/>
                </label>
                <input type="submit" value="Login"/>
            </form>
        </>
    )
}