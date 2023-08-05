import '../css/styles.css'
import '../css/main-body.css'
import {useCallback, useEffect, useState} from "react";
import ProductCard from "./ProductCard";


export function useAPIData(url) {
    const [lastURL, setLastURL] = useState(""); //TODO: Ask if this is ok or should be avoided.
    const [data, setData] = useState(null);

    if(url !== lastURL)
    {
        setData(null);
        setLastURL(url);
    }
    
    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        setData(json);
                        setLastURL(url);
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [url]);
    return data;
}

export default function MainBody({filteringCriterion, numberOfProductsToFetch, numberOfProductsSkipped, setNumberOfProductsSkipped, products, setProducts, addNewItems, setAddNewItems})
{

    let linkToFetch;
    if(filteringCriterion === "all")
        linkToFetch = `https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`;
    else {
        console.log(filteringCriterion);
        linkToFetch = `https://dummyjson.com/products/category/${filteringCriterion}?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`;
    }
    const apiData = useAPIData(linkToFetch, addNewItems);
    console.log(linkToFetch);
    useEffect(() =>{

        if(apiData != null && addNewItems)
        {
            setProducts([...products, ...apiData.products]);
            setNumberOfProductsSkipped(numberOfProductsSkipped + numberOfProductsToFetch);
            setAddNewItems(false);
        }
    }, [apiData, addNewItems, setProducts, products, setNumberOfProductsSkipped, numberOfProductsSkipped, numberOfProductsToFetch, setAddNewItems])
    function loadMoreItems()
    {
        setAddNewItems(true);

    }

    return (
        <>
            <div id="products-list">
                {products.length > 0 ?
                    products.map(product => (
                    <ProductCard key={product.id} productObject={product} />
                ))
                :
                    <p>Loading...</p>
                }
            </div>

            <div className="load-more-container">
                <button onClick={loadMoreItems} id="load-more-button">
                    Load More
                </button>
                <img
                    id="products-list-loader"
                    src="../public/images/loading_gif.gif"
                    className="loader hidden-element"
                    alt="loader"
                />
            </div>
        </>
    );
}