import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { tripSlice } from "./selectedTrip";
import { createWrapper } from "next-redux-wrapper";
import { formStepSlice } from "./stepForm";
import { seatSlice } from "./selectedSeat";
const makeStore = () =>
    configureStore({
        reducer: {
            [tripSlice.name]: tripSlice.reducer,
            [formStepSlice.name]: formStepSlice.reducer,
            [seatSlice.name]: seatSlice.reducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
