import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
export interface SeatState {
    selectedSeats: Array<Number>;
}

// Initial state
const initialState: SeatState = {
    selectedSeats: [],
};

// Actual Slice
export const seatSlice = createSlice({
    name: "selectedSeats",
    initialState,
    reducers: {
        resetSeletedSeats: () => initialState,
        setSelectedSeats(state, action) {
            state.selectedSeats = action.payload;
        },
    },
});

export const { setSelectedSeats, resetSeletedSeats } = seatSlice.actions;

export const selectSeatsState = (state: AppState) => state.selectedSeats;
export default seatSlice.reducer;
