export default function Cart()
{
    return (
        <>
            <header>
                <h1>Checkout</h1>
            </header>
            <main>
                <div className="cart-wrapper">
                    <div id="products-list">
                        
                    </div>
                </div>

                {/*<img src="../public/images/loading_gif.gif" className="loader hidden-attribute" alt="loader"></img>*/}
                <div className="checkout-elements">
                    <p id="total-text">Total: </p>
                    <button id="buy-button" onClick="alert('Transaction successful! We hope to see you again soon!')">Buy!</button>
                </div>

            </main>
        </>
    )
}