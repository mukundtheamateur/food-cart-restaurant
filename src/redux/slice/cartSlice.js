import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const addToCart = createAsyncThunk('addToCart', async (data) => {
    console.log(data)
    const res =await axios.post("http://localhost:4000/cart/add",data,{withCredentials:true})
    return data;
});

export const getCartItems = createAsyncThunk('get-cart-items', async () => {
    console.log("getting cart items")
    const data =await axios.get("http://localhost:4000/cart/get",{withCredentials:true})
    return data.data;
})



export const cartQtyIncDec = createAsyncThunk('cart-qty-inc-dec', async (data) => {
    console.log(data)
    const res =await axios.put("http://localhost:4000/cart/update",data,{withCredentials:true})
    return data;
})


export const cartRemove = createAsyncThunk('cart-remove', async (data) => {
    console.log("data of the food_id is : ",data)
    const res = await axios.delete(`http://localhost:4000/cart/remove?food_id=${data.food_id}`,{withCredentials:true})
    console.log(res)
    return data;
})

export const clearCart = createAsyncThunk('clear-cart', async () => {
    const res =await axios.delete("http://localhost:4000/cart/clear",{withCredentials:true})
    return res.data;
})

const cartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cartItems: [],
        error:null
    },
    reducers: {
        clearState(state, action) {
            state.cartItems=[]
            state.error=null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log(action.payload)
                const index= state.cartItems.findIndex((item) => item.id === action.payload.food_id);
                if(index!==-1){
                    state.cartItems[index].quantity+=action.payload.quantity;
                }else{
                    state.cartItems.push(action.payload)
                }
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload.cart
            })
            .addCase(cartQtyIncDec.fulfilled, (state, action) => {
                const index= state.cartItems.findIndex((item) => item.food_id === action.payload.food_id);
                state.cartItems[index].quantity=action.payload.quantity;
            })
            .addCase(cartRemove.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.food_id);
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.cartItems = [];
            })
            .addCase(clearCart.pending, (state, action) => {
                state.error = null;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
});

export const { clearState } = cartSlice.actions;

export default cartSlice.reducer;