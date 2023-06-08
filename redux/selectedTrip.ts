import IBookingTrip from "@/models/Book/book-trip";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
export interface TripState {
    seletedTrip: IBookingTrip;
}

// Initial state
const initialState: TripState = {
    seletedTrip: {} as IBookingTrip,
};

// Actual Slice
export const tripSlice = createSlice({
    name: "selectedTrip",
    initialState,
    reducers: {
        resetSeletedTrip: () => initialState,
        setSelectedTrip(state, action) {
            state.seletedTrip = action.payload;
        },
    },
});

export const { setSelectedTrip, resetSeletedTrip } = tripSlice.actions;

export const selectTripState = (state: AppState) => state.selectedTrip;
export default tripSlice.reducer;
