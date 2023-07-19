import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import moment from "moment";

// Type for our state
const today = moment();
export interface FilterState {
    startLocation: string;
    endLocation: string;
    journeyDate: string;
    times: string;
    gn: boolean;
    gt: boolean;
    avSeat: 0;
}

const initialState: FilterState = {
    startLocation: "",
    endLocation: "",
    journeyDate: today.format("YYYY-MM-DD"),
    times: "",
    gn: false,
    gt: false,
    avSeat: 0,
};

// Actual Slice
export const filterSlice = createSlice({
    name: "filter",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        setFilterGN(state, action) {
            // const { accessToken } = action.payload;
            state.gn = action.payload;
        },
        setFilterGT(state, action) {
            // const { accessToken } = action.payload;
            state.gt = action.payload;
        },
        setFilterSL(state, action) {
            // const { accessToken } = action.payload;
            state.startLocation = action.payload;
        },
        setFilterEL(state, action) {
            // const { accessToken } = action.payload;
            state.endLocation = action.payload;
        },
        setFilterJD(state, action) {
            // const { accessToken } = action.payload;
            state.journeyDate = action.payload;
        },
        setFilterTime(state, action) {
            // const { accessToken } = action.payload;
            state.times = action.payload;
        },
        setFilterAvSeat(state, action) {
            // const { accessToken } = action.payload;
            state.avSeat = action.payload;
        },
    },
});

export const {
    reset,
    setFilterGN,
    setFilterGT,
    setFilterSL,
    setFilterEL,
    setFilterJD,
    setFilterTime,
    setFilterAvSeat,
} = filterSlice.actions;

export const selectFilterState = (state: AppState) => state.filter;
export default filterSlice.reducer;
