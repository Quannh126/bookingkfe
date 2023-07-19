import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import { Button, Grid } from "@mui/material";
import { ILineForm } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface LineFormProps {
    // eslint-disable-next-line no-unused-vars
    onAdd?: (data: ILineForm) => void;
    onCancel: () => void;
}

export function LineForm({ onAdd, onCancel }: LineFormProps) {
    const schema = yup.object().shape({
        arrival: yup.string().required("Vui lòng nhập tỉnh đi"),
        departure: yup.string().required("Vui lòng nhập tỉnh đến"),
        to: yup.string().required("Vui lòng nhập điểm khởi hành"),
        from: yup.string().required("Vui lòng nhập điểm cuối"),
    });
    const { control, handleSubmit } = useForm<ILineForm>({
        defaultValues: {
            arrival: "",
            departure: "",
            to: "",
            from: "",
        },
        resolver: yupResolver(schema),
    });
    function handleAddSubmit(data: ILineForm) {
        onAdd?.(data);
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
        >
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        name="departure"
                        control={control}
                        label="Tỉnh khởi hành"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        name="arrival"
                        control={control}
                        label="Tỉnh đến"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Từ"
                        name="from"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Đến"
                        name="to"
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
                        Thêm
                    </Button>
                    <Button onClick={handleOnCancel}>Đóng</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
