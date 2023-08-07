
export default function Register()
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
                <label>
                    Confirm password:<br/>
                    <input type="password"/><br/>
                </label>
                <input type="submit" value="Register"/>
            </form>
        </>
    )
}