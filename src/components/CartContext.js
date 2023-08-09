import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [refreshCartPanel, setRefreshCartPanel] = useState(false);

    return (
        <CartContext.Provider value={{ refreshCartPanel, setRefreshCartPanel }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}