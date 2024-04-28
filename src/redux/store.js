import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/user/authReducer";
import cartReducer from "./features/product/cartReducer";

const store = configureStore({
    reducer: {
        userAuth: authReducer,
        productCart: cartReducer
    }
});

export default store;