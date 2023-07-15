import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from "@mui/material";
import { ICustomerDetail } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface CustomerUpdateFormProps {
    initData?: ICustomerDetail;
    showCustomerUpdateForm: boolean;
    // eslint-disable-next-line no-unused-vars
    handleClose2: (event: Object, reason: string) => void;
    // eslint-disable-next-line no-unused-vars
    onUpdate?: (data: ICustomerDetail) => void;
    onCancel: () => void;
    activity: string;
}

export function CustomerUpdateForm({
    initData,
    handleClose2,
    showCustomerUpdateForm,
    onUpdate,
    onCancel,
}: CustomerUpdateFormProps) {
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
    const { control, handleSubmit } = useForm<ICustomerDetail>({
        defaultValues: initData,
        resolver: yupResolver(schema),
    });
    function handleUpdateSubmit(data: ICustomerDetail) {
        onUpdate?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }
    return (
        <Dialog
            open={showCustomerUpdateForm}
            keepMounted={false}
            onClose={handleClose2}
            // maxWidth="lg"
            aria-labelledby="update-customer"
            aria-describedby="update-customer"
        >
            <Box
                component="form"
                // onSubmit={}

                onSubmit={handleSubmit(handleUpdateSubmit)}
            >
                <DialogTitle
                    id="add-trip"
                    display="flex"
                    sx={{ justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        Cập nhật thông tin khách hàng
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
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
                                control={control}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: "normal",
                        }}
                    >
                        Cập nhật
                    </Button>

                    <Button onClick={handleOnCancel}>Đóng</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
