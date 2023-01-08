import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import { Button, Grid } from "@mui/material";
import { ICarDetail } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface CarUpdateFormProps {
    initData?: ICarDetail;
    // eslint-disable-next-line no-unused-vars
    onUpdate?: (data: ICarDetail) => void;
    onCancel: () => void;
    activity: string;
}

export function CarUpdateForm({
    initData,
    onUpdate,
    onCancel,
    activity,
}: CarUpdateFormProps) {
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Please enter name")
            .min(4, "Username is required to have at least 4 characters"),
        typeCar: yup.string().required("Please enter type"),
        capacity: yup
            .string()
            .required("Please enter capacity")
            .matches(/^[0-9]+$/, "Capacity be only digits"),
    });
    const { control, handleSubmit } = useForm<ICarDetail>({
        defaultValues: {
            _id: !initData ? "" : initData._id,
            name: !initData ? "" : initData.name,
            typeCar: !initData ? "" : initData.typeCar,
            capacity: !initData ? "" : initData.capacity,
            imagePath: !initData ? "" : initData.imagePath,
            description: !initData ? "" : initData.description,
            status: activity,
        },
        resolver: yupResolver(schema),
    });
    function handleUpdateSubmit(data: ICarDetail) {
        onUpdate?.(data);
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
            onSubmit={handleSubmit(handleUpdateSubmit)}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <InputField
                        type="text"
                        name="name"
                        control={control}
                        label="Name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        name="typeCar"
                        control={control}
                        label="Type"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Capacity"
                        name="capacity"
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <InputField
                        label="Description"
                        type="text"
                        name="description"
                        multiline
                        rows={4}
                        maxRows={6}
                        control={control}
                    />
                </Grid>
                <Grid item xs={2} md={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: "normal",
                        }}
                    >
                        Update
                    </Button>
                    <Button onClick={handleOnCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
    );
}