// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
            query: (arg) => {const{userId, userToken} = arg; if(!userId) return; return {url: `http://localhost:3001/cart/${userId}`, method: 'GET', headers: {"Internship-Auth": userToken}}},
            providesTags: ['CartProducts']
        }),
        getSingleStoreProduct: builder.query({
          query: (productId) => {
              return {
                  url: `http://localhost:3001/products/${productId}`,
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
            query: (args) => {
                const {userId, userToken, newProduct} = args;
                return {
                url: `http://localhost:3001/cart/${userId}`,
                method: 'PUT',
                headers: {"Content-Type": 'application/json', "Internship-Auth": userToken},
                body: {"products": [newProduct]}
            }},
            invalidatesTags: ['CartProducts']
        }),
        removeFromCart: builder.mutation({
            query: (args) => {
                const {userId, userToken, productId} = args;
                return {
                url: `http://localhost:3001/cart/${userId}/products/${productId}`,
                method: 'DELETE',
                headers: {"Internship-Auth": userToken}
            }},
            invalidatesTags: ['CartProducts']
        })
    })
})


export const { useGetCartProductsQuery, useGetSingleStoreProductQuery, useGetRequiredStoreProductsQuery, useAddToCartMutation, useRemoveFromCartMutation } = apiSlice