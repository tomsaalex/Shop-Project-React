import logo from '../logo.svg';
import Header from "./Header";
import ActionBar from "./ActionBar";
import MainBody from "./MainBody";
import {useState} from "react";

export default function App() {
    // TODO: Ask if lifting all of these states is really necessary
    let [addNewItems, setAddNewItems] = useState(true);
    let [products, setProducts] = useState([]);
    let [numberOfProductsToFetch, setNumberOfProductsToFetch] = useState(4);
    let [numberOfProductsSkipped, setNumberOfProductsSkipped] = useState(0);

    let [filteringCriterion, setFilteringCriterion] = useState("all");

    return (
        <>
            <Header/>
            <ActionBar setFilteringCriterion={setFilteringCriterion} setNumberOfProductsSkipped={setNumberOfProductsSkipped} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems}/>
            <MainBody filteringCriterion={filteringCriterion} numberOfProductsToFetch={numberOfProductsToFetch} numberOfProductsSkipped={numberOfProductsSkipped} setNumberOfProductsSkipped={setNumberOfProductsSkipped} products={products} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems}/>
        </>
    )
}
