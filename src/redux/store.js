import { configureStore } from "@reduxjs/toolkit";
import userRducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";


const store = configureStore({
    reducer: {
        user:userRducer,
        cart:cartReducer
    }
})


export default store