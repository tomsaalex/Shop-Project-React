export default function Header()
{
    return(
        <>
            <h1>AlexT's Magnificent Shop</h1>
            <div id="action_bar">
                <select>
                    <option id="list-of-categories"></option>
                </select>
                <label>Search: <input type="text" /></label>
            </div>
        </>
    )
}