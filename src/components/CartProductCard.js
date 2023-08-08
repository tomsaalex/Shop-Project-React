export default function CartProductCard({item})
{
    return (
        <>
            <div data-id={item.id} className="cart-item-container">
                <img src={item["thumbnail"]} className="cart-item-thumbnail" alt="a picture of the item"></img>
                <p className="cart-item-title">{item['title']}</p>
                <p className="cart-item-price">${item['price']}</p>
                <p className="cart-item-amount">x{item['quantity']}</p>
            </div>
        </>
    )
}