import {useEffect, useState} from "react";
import Header from "./Header";
import ActionBar from "./ActionBar";
import MainBody from "./MainBody";
import "../css/main-body.css"

export default function Shop()
{
    const [pageNumber, setPageNumber] = useState(1);
    const [addNewItems, setAddNewItems] = useState(true);
    const [products, setProducts] = useState([]);
    const [numberOfProductsToFetch, setNumberOfProductsToFetch] = useState(4);
    const [numberOfProductsSkipped, setNumberOfProductsSkipped] = useState(0);

    const [filteringCriterion, setFilteringCriterion] = useState("all");
    const [searchedText, setSearchedText] = useState("");

    return (
        <>
            <Header/>
            <ActionBar setFilteringCriterion={setFilteringCriterion} setNumberOfProductsSkipped={setNumberOfProductsSkipped} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems} setSearchedText={setSearchedText} numberOfProductsToFetch={numberOfProductsToFetch} setNumberOfProductsToFetch={setNumberOfProductsToFetch} setPageNumber={setPageNumber}/>
            <MainBody filteringCriterion={filteringCriterion} numberOfProductsToFetch={numberOfProductsToFetch} numberOfProductsSkipped={numberOfProductsSkipped} setNumberOfProductsSkipped={setNumberOfProductsSkipped} products={products} setProducts={setProducts} addNewItems={addNewItems} setAddNewItems={setAddNewItems} searchedText={searchedText} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
        </>
    )
}