// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cartId = require('../cart_id.json')["cart-id"];

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({ baseUrl: `` }),
    tagTypes: ['CartProducts'],

    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        getCartProducts: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => {return {url: `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`, method: 'GET', headers: {"Internship-Auth": `${localStorage.getItem("user")}`}}},
            providesTags: ['CartProducts']
        }),
        getSingleStoreProduct: builder.query({
          query: (productId) => {
              return {
                  url: `https://dummyjson.com/products/${productId}`,
                  method: 'GET'
              }
          }
        }),
        getRequiredStoreProducts: builder.query({
            query: (linkToFetch) => ({
                url: linkToFetch,
                method: 'GET'
            })
        }),
        addToCart: builder.mutation({
            query: newProduct => { return {
                url: `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}`,
                method: 'PUT',
                headers: {"Content-Type": 'application/json', "Internship-Auth": `${localStorage.getItem("user")}`},
                body: {"products": [newProduct]}
            }},
            invalidatesTags: ['CartProducts']
        }),
        removeFromCart: builder.mutation({
            query: (productId) => { return {
                url: `http://vlad-matei.thrive-dev.bitstoneint.com/wp-json/internship-api/v1/cart/${cartId}?products[]=${productId}`,
                method: 'DELETE',
                headers: {"Internship-Auth": `${localStorage.getItem("user")}`}
            }},
            invalidatesTags: ['CartProducts']
        })
    })
})


export const { useGetCartProductsQuery, useGetSingleStoreProductQuery, useGetRequiredStoreProductsQuery, useAddToCartMutation, useRemoveFromCartMutation } = apiSlice