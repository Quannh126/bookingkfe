import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
export interface FilterState {
    car_type: string;
    capacity: string;
}

const initialState: FilterState = {
    car_type: "",
    capacity: "",
};

// Actual Slice
export const filterSlice = createSlice({
    name: "filter",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.car_type = initialState.car_type;
            state.capacity = initialState.capacity;
        },
        setFilterCarType(state, action) {
            // const { accessToken } = action.payload;
            state.car_type = action.payload.car_type;
        },
        setFilterCapacity(state, action) {
            // const { accessToken } = action.payload;
            state.capacity = action.payload.capacity;
        },
    },
});

export const { reset, setFilterCarType, setFilterCapacity } =
    filterSlice.actions;

export const selectFilterState = (state: AppState) => state.filter;
export default filterSlice.reducer;
