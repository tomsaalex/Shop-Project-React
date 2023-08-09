import {Router, Routes, Route} from "react-router";
import Homepage from "./Homepage";
import Login from "./Login";
import Store from "./Store";
import ProductPage from "./ProductPage";
import {useState} from "react";
import {AuthProvider} from "./AuthProvider";

export default function App() {

    const [refreshCartPanel, setRefreshCartPanel] = useState(false);

    return (
        <>
                <AuthProvider>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/shop" element={<Store refreshCartPanel={refreshCartPanel} setRefreshCartPanel={setRefreshCartPanel}/>}/>
                    <Route path="/shop/:product_id" element={<ProductPage refreshCartPanel={refreshCartPanel} setRefreshCartPanel={setRefreshCartPanel}/>}/>
                </Routes>
                </AuthProvider>
        </>
    )
}
