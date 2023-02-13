import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import { Button, Grid, Typography } from "@mui/material";
import { ICarForm } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import FileUpload from "react-mui-fileuploader";
// import { UploadFileBox } from "../form/upload-file";

export interface CarFormProps {
    // eslint-disable-next-line no-unused-vars
    onAdd?: (data: ICarForm) => void;
    onCancel: () => void;
}

export function CarForm({ onAdd, onCancel }: CarFormProps) {
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Xin vui lòng nhập tên xe")
            .min(4, "Tên xe ít nhất có 4 kí tự"),
        type_car: yup.string().required("Vui lòng nhập kiểu xe"),
        driver_name: yup
            .string()
            .required("Xin vui lòng nhập tên tài xế")
            .min(4, "Tên tài xế ít nhất có 4 kí tự"),
        license_plate: yup.string().required("Vui lòng nhập biển số xe"),
        capacity: yup
            .string()
            .required("Vui lòng nhập số ghế")
            .matches(/^[0-9]+$/, "Số ghế phải là số"),
        phonenumber: yup
            .string()
            .required("Vui lòng nhập số điện thoại")
            .matches(/^[0-9]+$/, "số điện thoại phải là chữ số"),
    });
    const { control, handleSubmit } = useForm<ICarForm>({
        defaultValues: {
            name: "",
            type_car: "",
            capacity: "",
            license_plate: "",
            description: "",
        },
        resolver: yupResolver(schema),
    });
    function handleAddSubmit(data: ICarForm) {
        console.log(data);
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
                <Grid item xs={12} md={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        Thêm mới
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        name="name"
                        control={control}
                        label="Tên xe"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <InputField
                        type="text"
                        name="type_car"
                        label="Kiểu xe"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <InputField
                        type="text"
                        label="Số ghế"
                        name="capacity"
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <InputField
                        type="text"
                        label="Biển số xe"
                        name="license_plate"
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Tên tài xế"
                        name="driver_name"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <InputField
                        type="text"
                        label="Số điện thoại"
                        name="phonenumber"
                        control={control}
                    />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Biển số xe"
                        name="license_plate"
                        control={control}
                    />
                </Grid> */}
                {/* <Grid item xs={12} md={12}>
                    <UploadFileBox name="attachment" control={control} />
                </Grid> */}

                <Grid item xs={12} md={12}>
                    <InputField
                        label="Mô tả"
                        type="text"
                        name="description"
                        multiline
                        rows={4}
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={8}></Grid>

                <Grid item xs={12} md={1}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: "normal",
                        }}
                    >
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12} md={1}></Grid>
                <Grid item xs={2} md={1}>
                    <Button onClick={handleOnCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
