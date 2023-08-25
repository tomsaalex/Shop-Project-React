import '../css/styles.css'
import '../css/main-body.css'
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard";
import {useGetAllStoreProductsQuery, useGetRequiredStoreProductsQuery} from "../api/apiSlice";

export function useAPIData(url, typeOfData, filterCategory, pageSize, numItemsToSkip) {
    const [lastURL, setLastURL] = useState("");
    const [data, setData] = useState(null);

    if(url !== lastURL)
    {
        setData(null);
        setLastURL(url);
    }

    useEffect(() => {
        if (url) {
            let ignore = false;
            if(typeOfData === "products")
            {
                let cacheName = "store-products";
                if(filterCategory !== "all")
                    cacheName = `store-products-${filterCategory}`;

                let storageData = sessionStorage.getItem(cacheName);

                let productsList = storageData ? JSON.parse(storageData) : [];

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
                .then(response =>  response.json())
                .then(json => {
                    if (!ignore) {
                        if(typeOfData === "products") {
                            let cacheName = "store-products";
                            if(filterCategory !== "all")
                                cacheName = `store-products-${filterCategory}`;

                            let storageData = sessionStorage.getItem(cacheName);
                            let productsList = storageData ? JSON.parse(storageData) : [];

                            let newProductsList = productsList ? [...productsList, ...json.products] : json.products;

                            let stringifiedStuff = JSON.stringify(newProductsList);

                            sessionStorage.setItem(cacheName, JSON.stringify(newProductsList));
                        }
                        setData(json);
                        setLastURL(url);
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [filterCategory, url]);
    return data;
}

export default function MainBody({filteringCriterion, numberOfProductsToFetch, numberOfProductsSkipped, setNumberOfProductsSkipped, products, setProducts, addNewItems, setAddNewItems, searchedText, pageNumber, setPageNumber })
{
    let linkToFetch = `http://localhost:3001/products?limit=${numberOfProductsToFetch}&skip=${(pageNumber - 1) * numberOfProductsToFetch}`;

    if(filteringCriterion && filteringCriterion !== "all")
        linkToFetch += `&category=${filteringCriterion}`;

    if(searchedText)
        linkToFetch += `&q=${searchedText}`;

    const {
        data:productsData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRequiredStoreProductsQuery(linkToFetch);

    let content;

    if(isSuccess)
    {
        //console.log(productsData);
        if(productsData.products.length === 0)
            prevPage();
        content = productsData.products.map(product => { return (
            <ProductCard productObject={product} key={product._id}  />
        )})
    }
    if(isLoading)
    {
        content = <p>Loading...</p>
    }

    function loadMoreItems()
    {
        setAddNewItems(true);
    }

    function prevPage()
    {
        if(pageNumber > 1)
            setPageNumber(pageNumber - 1);
    }

    function nextPage()
    {
        setPageNumber(pageNumber + 1)
    }

    return (
        <>
            <div id="products-list">
                {content}
            </div>

            <div className="load-more-container">
                <div className="page-navigation-buttons">
                    <button onClick={prevPage}>{'<'}</button>
                    <p>{pageNumber}</p>
                    <button onClick={nextPage}>{'>'}</button>
                </div>
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