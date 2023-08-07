import {Router, Routes, Route} from "react-router";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import Store from "./Store";
import ProductPage from "./ProductPage";

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/shop" element={<Store/>}/>
                    <Route path="/shop/:product_id" element={<ProductPage/>}/>
                </Routes>
            </Router>
        </>
    )
}
