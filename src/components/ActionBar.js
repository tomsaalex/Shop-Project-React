import '../css/action-bar.css'
import {useAPIData} from "./MainBody";
import {useState} from "react";

export default function ActionBar({setFilteringCriterion, setNumberOfProductsSkipped, setProducts, addNewItems, setAddNewItems, queryType, setQueryType, setSearchedText, numberOfProductsToFetch, setNumberOfProductsToFetch }){
    let [productCategories, setProductCategories] = useState(['all']);

    let apiData = useAPIData('https://dummyjson.com/products/categories');
    if(apiData !== null && productCategories.length === 1) {
        setProductCategories([...productCategories, ...apiData]);
    }

    function onCategoryChange(e){
        if(queryType !== "filter")
            return;
        setFilteringCriterion(e.target.value);
        setNumberOfProductsSkipped(0);
        setProducts([]);
        setAddNewItems(true);
    }

    function onSearchTextChange(e)
    {
        if(queryType !== "search")
            return;
        setSearchedText(e.target.value);
        setNumberOfProductsSkipped(0);
        setProducts([]);
        setAddNewItems(true);
    }

    function onPageCountChange(e)
    {
        let numberPageCount = Number(e.target.value);
        if(numberPageCount <= 0){
            e.target.value = 1;
            numberPageCount = 1;
        }

        setNumberOfProductsToFetch(numberPageCount);
    }

    return (<div id="action-bar">
        <label>Query type
            <select onChange={(e) => setQueryType(e.target.value)}>
                <option value="filter">Filter</option>
                <option value="search">Search</option>
            </select>
        </label>
        <label>Select a category<select onChange={onCategoryChange} id="list-of-categories">
            {productCategories.length > 0 ?
                productCategories.map(productCategory => <option key={productCategory}>{productCategory}</option>)
                :
                <option>Waiting for data to load....</option>
            }
        </select></label>
        <label>Search: <input onChange={onSearchTextChange} type="text" /></label>
        <label>
            Items per page:
            <input min="1" defaultValue={numberOfProductsToFetch} onChange={onPageCountChange} type="number"/>
        </label>
    </div>)
}