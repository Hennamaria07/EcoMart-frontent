import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/user/authReducer";

const store = configureStore({
    reducer: {
        user: authReducer
    }
});

export default store;