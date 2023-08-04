import './styles.css'
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard";

export default function MainBody()
{
    let [products, setProducts] = useState([]);
    let productFilteringCriterion = "";

    let [numberOfProductsToFetch, setNumberOfProductsToFetch] = useState(4);
    let [numberOfProductsSkipped, setNumberOfProductsSkipped] = useState(0);

    function loadMoreItems()
    {
        let linkToFetch;
        if(productFilteringCriterion === "")
            linkToFetch = `https://dummyjson.com/products?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`;
        else
            linkToFetch = `https://dummyjson.com/products/category/${productFilteringCriterion}?limit=${numberOfProductsToFetch}&skip=${numberOfProductsSkipped}`;

        fetch(linkToFetch)
            .then(async (res) => {
                let prods = (await res.json()).products;
                console.log(prods);
                console.log(products);
                let newProducts;
                if(products.length > 0)
                    newProducts = [...products, ...prods];
                else
                    newProducts = prods;
                setProducts(newProducts);

            });

        setNumberOfProductsSkipped(numberOfProductsSkipped + numberOfProductsToFetch);
    }

    useEffect(() => {
        loadMoreItems();
    }, []);

    return (
        <>
            <div id="products-list">
                {products.map(product => (
                    <ProductCard key={product.id} productObject={product} />
                ))}
            </div>

            <div className="load-more-container">
                <button onClick={loadMoreItems} id="load-more-button">
                    Load More
                </button>
                <img
                    id="products-list-loader"
                    src="../public/images/loading_gif.gif"
                    className="loader hidden-attribute"
                    alt="loader"
                />
            </div>
        </>
    );
}