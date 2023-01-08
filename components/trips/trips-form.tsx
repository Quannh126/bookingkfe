import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "../form";
import { Button, Grid } from "@mui/material";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITripForm } from "@/models/Trips/trip-form";
import { KeyValue } from "@/models";

export interface TripFormProps {
    allOptions: Array<KeyValue>;
    // eslint-disable-next-line no-unused-vars
    onAdd?: (carid: string, data: ITripForm) => void;
    onCancel: () => void;
}

export function TripForm({ onAdd, onCancel, allOptions }: TripFormProps) {
    const schema = yup.object().shape({
        to: yup
            .string()
            .required("Please enter to")
            .min(4, "Have at least 4 characters"),
        from: yup
            .string()
            .required("Please enter from")
            .min(4, "Have at least 4 characters"),
        departure: yup
            .string()
            .required("Please enter departure")
            .min(4, "Have at least 4 characters")
            .matches(
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                "Arrival be only format hh:mm"
            ),
        arrival: yup
            .string()
            .required("Please enter arrival")
            .min(4, "Have at least 4 characters")
            .matches(
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                "Arrival be only format hh:mm"
            ),
        fare: yup
            .string()
            .required("Please enter fare")
            .matches(/^[0-9]+$/, "Fare be only digits"),
        //car: yup.string().required("Please select car"),
    });
    const { control, handleSubmit } = useForm<ITripForm>({
        defaultValues: {
            to: "",
            from: "",
            fare: "",
            departure: "",
            arrival: "",
            car: "",
        },
        resolver: yupResolver(schema),
    });
    function handleAddSubmit(data: ITripForm) {
        console.log(data);
        onAdd?.(data.car, data);
    }
    function handleOnCancel() {
        onCancel();
    }

    return (
        <Box
            component="form"
            // onSubmit={}
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                flexGrow: 1,
            }}
            p={4}
            onSubmit={handleSubmit(handleAddSubmit)}
            //onSubmit={() => console.log("submit")}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <SelectField
                        allOptions={allOptions}
                        control={control}
                        name="car"
                        label="Car"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="From"
                        name="from"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        name="to"
                        control={control}
                        label="To"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputField
                        label="Departure"
                        type="text"
                        name="departure"
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputField
                        label="Arrival"
                        type="text"
                        name="arrival"
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputField
                        label="Fare"
                        type="text"
                        name="fare"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: "normal",
                        }}
                    >
                        Add
                    </Button>
                    <Button onClick={handleOnCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
