import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import { Button, Grid, Typography } from "@mui/material";
import { ICustomerForm } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import FileUpload from "react-mui-fileuploader";
// import { UploadFileBox } from "../form/upload-file";

export interface CustomerFormProps {
    errorMsg?: string;
    // eslint-disable-next-line no-unused-vars
    onAdd?: (data: ICustomerForm) => void;
    onCancel: () => void;
}

export function CustomerForm({ onAdd, onCancel, errorMsg }: CustomerFormProps) {
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Xin vui lòng nhập tên khách hàng")
            .min(4, "Tên xe ít nhất có 4 kí tự"),
        email: yup
            .string()
            .matches(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
                "Email không đúng định dạng"
            ),
        phonenumber: yup
            .string()
            .required("Vui lòng nhập số điện thoại")
            .matches(/^[0-9]+$/, "số điện thoại phải là chữ số"),
    });
    const { control, handleSubmit } = useForm<ICustomerForm>({
        defaultValues: {
            name: "",
            phonenumber: "",
            email: "",
            address: "",
        },
        resolver: yupResolver(schema),
    });
    function handleAddSubmit(data: ICustomerForm) {
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
                        Thêm mới khách hàng
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        name="name"
                        control={control}
                        label="Tên khách hàng"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        name="email"
                        label="Email"
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

                <Grid item xs={12} md={9}>
                    <InputField
                        label="Địa chỉ"
                        type="text"
                        name="address"
                        // multiline
                        // rows={4}
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    {errorMsg && (
                        <Typography
                            component="p"
                            sx={{
                                color: "red",
                                alignSelf: "stretch",
                            }}
                        >
                            {errorMsg}
                        </Typography>
                    )}
                </Grid>

                <Grid item xs={12} md={1}></Grid>
                <Grid item xs={12} md={1}></Grid>
                <Grid item xs={2} md={2} sx={{ display: "flex" }}>
                    <Button type="submit" variant="contained">
                        Thêm
                    </Button>
                    <Button
                        onClick={handleOnCancel}
                        sx={{
                            margin: "normal",
                            marginLeft: 2,
                        }}
                    >
                        Huỷ
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
