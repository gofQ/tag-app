import { configureStore } from "@reduxjs/toolkit";
import  mainSlice  from "./mainSlicer";


const store=configureStore({
    reducer:{
        main:mainSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
});

export default store;