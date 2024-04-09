import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "user auth",
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.isAuthenticated = action.payload.isAuthenticated
        }
    }
})

export const {getCurrentUser} = authSlice.actions;
export default authSlice.reducer;
