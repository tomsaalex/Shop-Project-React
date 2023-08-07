import '../css/styles.css'
import '../css/main-body.css'
import {useCallback, useEffect, useState} from "react";
import ProductCard from "./ProductCard";


export function useAPIData(url, options) {
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
            if(options && options["type-of-data"] === "products")
            {
                let storageData = sessionStorage.getItem("store-products");

                console.log(storageData);
                let productsList = storageData ? JSON.parse(storageData) : [];
                console.log(productsList);
                let pageSize = options["page-size"];
                let numItemsToSkip = options["num-items-to-skip"];

                if(!ignore && productsList && numItemsToSkip + pageSize <= productsList.length)
                {
                    setData(
                        {
                            products: productsList.slice(numItemsToSkip, numItemsToSkip + pageSize)
                        }
                    );
                    setLastURL(url);
                    return;
                }
            }
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {

                        if(options && options["type-of-data"] === "products") {
                            let productsList = JSON.parse(sessionStorage.getItem("store-products"));

                            let newProductsList = productsList ? [...productsList, ...json.products] : json.products;

                            let stringifiedStuff = JSON.stringify(newProductsList);
                            console.log(stringifiedStuff);

                            sessionStorage.setItem("store-products", JSON.stringify(newProductsList));
                        }
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

export default function MainBody({filteringCriterion, numberOfProductsToFetch, numberOfProductsSkipped, setNumberOfProductsSkipped, products, setProducts, addNewItems, setAddNewItems, queryType, searchedText})
{
    let linkToFetch;

    if(queryType === "filter"){
        if(filteringCriterion === "all")
            linkToFetch = `https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`;
        else {
            //console.log(filteringCriterion);
            linkToFetch = `https://dummyjson.com/products/category/${filteringCriterion}?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`;
        }
    }
    else if(queryType === "search"){
        linkToFetch = `https://dummyjson.com/products/search?q=${searchedText}`;
    }

    const apiData = useAPIData(linkToFetch, {
        "type-of-data": "products",
        "num-items-to-skip": numberOfProductsSkipped,
        "page-size": numberOfProductsToFetch
    });
    //console.log(linkToFetch);
    //console.log(products);
    useEffect(() =>{

        if(apiData != null && addNewItems)
        {
            setProducts([...products, ...apiData.products]);
            setNumberOfProductsSkipped(numberOfProductsSkipped + numberOfProductsToFetch);
            setAddNewItems(false);
        }
    }, [apiData, addNewItems, setProducts, products, setNumberOfProductsSkipped, numberOfProductsSkipped, numberOfProductsToFetch, setAddNewItems])

    function addToCache()
    {

    }

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