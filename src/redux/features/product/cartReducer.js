import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
    // count: parseInt(localStorage.getItem("cartCount")) || 0,
    cartItems: null,
    quantityCount: 1,
    status: "idle", // idle || loading || succeeded || failed
    error: null,

}

export const postCart = createAsyncThunk('product/addCart', async (orderItems) => {
    try {
        const res = await instance.post('/api/v1/cart/', {
            orderItems}, {withCredentials: true} );
            if(res.data.success) {
                toast.success(res.data.message)
                return res.data
            }
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        quantityInc: (state, action) => {
           state.quantityCount++
        },
        quantityDec: (state, action) => {
            if(state.quantityCount > 1) {
                state.quantityCount--
            }
        },
        addCarts: (state, action) => {
            state.cartItems = action.payload
        },
        extraReducers: (builder) => {
            builder
                .addCase(postCart.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(postCart.fulfilled, (state) => {
                    state.status = "succeeded";
                })
                .addCase(postCart.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                })
        },
    }
})

export const { cartInc, quantityInc, quantityDec, addCarts } = cartSlice.actions;
export default cartSlice.reducer;
