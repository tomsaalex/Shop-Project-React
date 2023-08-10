import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import { apiSlice } from "../api/apiSlice";

export default configureStore({
    reducer: {
        cart: cartReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})