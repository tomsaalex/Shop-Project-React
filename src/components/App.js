import logo from '../logo.svg';
import Header from "./Header";
import ActionBar from "./ActionBar";
import MainBody from "./MainBody";
import {useState} from "react";

export default function App() {
    // TODO: Ask if lifting all of these states is really necessary
    let [queryType, setQueryType] = useState('filter');
    let [addNewItems, setAddNewItems] = useState(true);
    let [products, setProducts] = useState([]);
    let [numberOfProductsToFetch, setNumberOfProductsToFetch] = useState(4);
    let [numberOfProductsSkipped, setNumberOfProductsSkipped] = useState(0);

    let [filteringCriterion, setFilteringCriterion] = useState("all");
    let [searchedText, setSearchedText] = useState("");

    return (
        <>
            <Header/>
            <ActionBar setFilteringCriterion={setFilteringCriterion} setNumberOfProductsSkipped={setNumberOfProductsSkipped} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems} queryType={queryType} setQueryType={setQueryType} setSearchedText={setSearchedText} numberOfProductsToFetch={numberOfProductsToFetch} setNumberOfProductsToFetch={setNumberOfProductsToFetch}/>
            <MainBody filteringCriterion={filteringCriterion} numberOfProductsToFetch={numberOfProductsToFetch} numberOfProductsSkipped={numberOfProductsSkipped} setNumberOfProductsSkipped={setNumberOfProductsSkipped} products={products} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems} queryType={queryType} searchedText={searchedText} />
        </>
    )
}
