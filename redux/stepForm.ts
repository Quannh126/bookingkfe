import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
// export interface FormStepState {
//     selected_seats: Array<number>;
//     fare: number;
//     name: string;
//     pickup: string;
//     dropoff: string;
//     email: string;
//     phone: string;
//     note: string;
//     step: number;
// }

// // Initial state
// const initialState: FormStepState = {
//     selected_seats: [],
//     fare: 0,
//     name: "",
//     pickup: "",
//     dropoff: "",
//     email: "",
//     phone: "",
//     note: "",
//     step: 1,
// };
// const isText = /^[A-Z ]+$/i;
// const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// const isPhone = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/; // us
// const isZip = /^[0-9]{5}([- /]?[0-9]{4})?$/; // us
// const isNumber = /^\d+$/;

// // Applied to all fields

// type Variant = "outlined" | "standard" | "filled";
// type Margin = "dense" | "normal" | "none";

// const variant: Variant = "standard";
// const margin: Margin = "normal";

export declare type ValidationSchema = Record<
    string,
    {
        value?: any;
        error?: string;
        required?: boolean;
        validate?:
            | "text"
            | "number"
            | "email"
            | "phone"
            | "zip"
            | "checkbox"
            | "select"
            | "array";
        minLength?: number;
        maxLength?: number;
        helperText?: string;
    }
>;
const initialState: ValidationSchema = {
    name: {
        value: "",
        error: "",
        required: true,
        validate: "text",
        minLength: 2,
        maxLength: 20,
        helperText: "Vui long nhập tên",
    },

    email: {
        value: "",
        error: "",
        validate: "email",
    },
    note: {
        value: "",
        error: "",
        validate: "text",
    },
    pickup: {
        value: "",
        error: "",
        validate: "select",
    },
    dropoff: {
        value: "",
        error: "",
        validate: "select",
    },

    // agreenemt: {
    //     value: false,
    //     error: "",
    //     required: true,
    //     validate: "checkbox",
    //     helperText: "Please accept our terms and conditions",
    // },
    phone: {
        value: "",
        error: "",
        validate: "phone",
        maxLength: 15,
    },

    selected_seats: {
        value: [],
        error: "",
        validate: "array",
        required: true,
    },
    fare: {
        value: 0,
        error: "",
        validate: "number",
        required: true,
    },
    step: {
        value: 0,
        error: "",
        validate: "number",
        required: true,
    },
    is_payment_online: {
        value: false,
        error: "",
        validate: "checkbox",
        required: true,
    },
};

// Actual Slice
export const formStepSlice = createSlice({
    name: "formStep",
    initialState,
    reducers: {
        // setSelectedTrip(state, action) {
        //     state.seletedTrip = action.payload;
        // },
        nextStep: (state) => {
            // console.log("next");
            state.step.value++;
        },
        prevStep: (state) => {
            // console.log("prev");
            state.step.value--;
        },
        resetState: () => initialState,

        setFormStep1(state, action) {
            // console.log("action", action.payload);
            state.selected_seats.value = action.payload.selected_seats;
            state.fare.value = action.payload.fare;
        },
        setFormStep2(state, action) {
            state.pickup.value = action.payload.pickup;
            state.dropoff.value = action.payload.dropoff;
        },
        setFormStep3(state, action) {
            state.name.value = action.payload.name;
            state.email.value = action.payload.email;
            state.note.value = action.payload.note;
            state.phone.value = action.payload.phone;
            state.is_payment_online.value = action.payload.is_payment_online;
        },
    },
});

export const {
    setFormStep3,
    setFormStep1,
    setFormStep2,
    nextStep,
    prevStep,
    resetState,
} = formStepSlice.actions;

export const getFormState = (state: AppState) => state.formStep;
export default formStepSlice.reducer;
