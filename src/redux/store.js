import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/user/authReducer";

const store = configureStore({
    reducer: {
        userAuth: authReducer
    }
});

export default store;