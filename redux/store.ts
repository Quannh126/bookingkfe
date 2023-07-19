import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { tripSlice } from "./selectedTrip";
import { createWrapper } from "next-redux-wrapper";
import { formStepSlice } from "./stepForm";
import { seatSlice } from "./selectedSeat";
import { authSlice } from "./selectedAuth";
import { menuSlice } from "./selectedMenu";
import { filterSlice } from "./selectedFilter";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
export const store: ToolkitStore = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [tripSlice.name]: tripSlice.reducer,
        [formStepSlice.name]: formStepSlice.reducer,
        [seatSlice.name]: seatSlice.reducer,
        [menuSlice.name]: menuSlice.reducer,
        [filterSlice.name]: filterSlice.reducer,
    },
    devTools: true,
});
const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
