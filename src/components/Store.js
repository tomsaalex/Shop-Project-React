import {useState} from "react";
import Header from "./Header";
import ActionBar from "./ActionBar";
import MainBody from "./MainBody";
import "../css/main-body.css"

export default function Store({refreshCartPanel, setRefreshCartPanel})
{

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
            <Header refrehCartPanel={refreshCartPanel} setRefreshCartPanel={setRefreshCartPanel}/>
            <ActionBar setFilteringCriterion={setFilteringCriterion} setNumberOfProductsSkipped={setNumberOfProductsSkipped} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems} queryType={queryType} setQueryType={setQueryType} setSearchedText={setSearchedText} numberOfProductsToFetch={numberOfProductsToFetch} setNumberOfProductsToFetch={setNumberOfProductsToFetch}/>
            <MainBody filteringCriterion={filteringCriterion} numberOfProductsToFetch={numberOfProductsToFetch} numberOfProductsSkipped={numberOfProductsSkipped} setNumberOfProductsSkipped={setNumberOfProductsSkipped} products={products} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems} queryType={queryType} searchedText={searchedText} setRefreshCartPanel={setRefreshCartPanel}/>
        </>
    )
}