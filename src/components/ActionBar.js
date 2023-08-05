import '../css/action-bar.css'
import {useAPIData} from "./MainBody";
import {useState} from "react";

export default function ActionBar({setFilteringCriterion, setNumberOfProductsSkipped, setProducts, addNewItems, setAddNewItems}){
    let [productCategories, setProductCategories] = useState(['all']);

    let apiData = useAPIData('https://dummyjson.com/products/categories');
    if(apiData !== null && productCategories.length === 1) {
        setProductCategories([...productCategories, ...apiData]);
    }

    function onCategoryChange(e){
        setFilteringCriterion(e.target.value);
        setNumberOfProductsSkipped(0);
        setProducts([]);
        setAddNewItems(true);

    }

    return (<div id="action-bar">
        <select onChange={onCategoryChange} id="list-of-categories">
            {productCategories.length > 0 ?
                productCategories.map(productCategory => <option key={productCategory}>{productCategory}</option>)
                :
                <option>Waiting for data to load....</option>
            }
        </select>
        <label>Search: <input type="text" /></label>
    </div>)
}