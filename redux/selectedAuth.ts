import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
export interface AuthState {
    token: string;
}

// Initial state
// const initialState: AuthState = {
//     token: "",
// };

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        logout: (state) => {
            state.token = null;
        },
        setCredentials(state, action) {
            const { accessToken } = action.payload;
            state.token = accessToken;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.token;
export default authSlice.reducer;
