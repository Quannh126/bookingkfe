import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
export interface MenuState {
    toggle: boolean;
}

// Initial state
// const initialState: AuthState = {
//     token: "",
// };

// Actual Slice
export const menuSlice = createSlice({
    name: "menu",
    initialState: { toggle: false },
    reducers: {
        toggleSidebar: (state) => {
            state.toggle = !state.toggle;
        },
    },
});

export const { toggleSidebar } = menuSlice.actions;

export const selectMenuState = (state: AppState) => state.menu.toggle;
export default menuSlice.reducer;
