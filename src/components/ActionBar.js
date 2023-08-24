import '../css/action-bar.css'
import {useAPIData} from "./MainBody";
import {useState} from "react";
import {debounce} from "../utils/utils";

export default function ActionBar({setFilteringCriterion, setNumberOfProductsSkipped, setProducts, addNewItems, setAddNewItems, setSearchedText, numberOfProductsToFetch, setNumberOfProductsToFetch, setPageNumber }){
    let [productCategories, setProductCategories] = useState(['all']);

    let apiData = useAPIData('http://188.24.76.55:3001/products/categories');

    if(apiData !== null && productCategories.length === 1) {
        setProductCategories([...productCategories, ...apiData]);
    }

    function onCategoryChange(e){

        setFilteringCriterion(e.target.value);
        setNumberOfProductsSkipped(0);
        setProducts([]);
        setPageNumber(1);
        setAddNewItems(true);
    }

    const onSearchTextChangeDebounce = debounce((e) => {
        setSearchedText(e.target.value);
        setNumberOfProductsSkipped(0);
        setProducts([]);
        setAddNewItems(true);
    }, 600);

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
        <label>Select a category<select onChange={onCategoryChange} id="list-of-categories">
            {productCategories.length > 0 ?
                productCategories.map(productCategory => <option key={productCategory}>{productCategory}</option>)
                :
                <option>Waiting for data to load....</option>
            }
        </select></label>
        <label>Search: <input onChange={onSearchTextChangeDebounce} type="text" /></label>
        <label>
            Items per page:
            <input min="1" defaultValue={numberOfProductsToFetch} onChange={onPageCountChange} type="number"/>
        </label>
    </div>)
}