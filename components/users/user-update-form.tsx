import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectFieldNormal } from "../form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from "@mui/material";
import { IUserDetail } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Role_List, StatusAccount } from "@/config/type-sell";

export interface UserUpdateFormProps {
    initData?: IUserDetail;
    showUserUpdateForm: boolean;
    // eslint-disable-next-line no-unused-vars
    handleClose2: (event: Object, reason: string) => void;
    // eslint-disable-next-line no-unused-vars
    onUpdate?: (data: IUserDetail) => void;
    onCancel: () => void;
    activity: string;
}

export function UserUpdateForm({
    initData,
    handleClose2,
    showUserUpdateForm,
    onUpdate,
    onCancel,
}: UserUpdateFormProps) {
    const schema = yup.object().shape({
        username: yup
            .string()
            .required("Xin vui lòng nhập tên đăng nhập")
            .min(4, "Tên xe ít nhất có 4 kí tự"),
        status: yup.string().required("Xin vui chọn trạng thái"),
        email: yup
            .string()
            .required("Xin vui lòng nhập Email")
            .matches(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
                "Email không đúng định dạng"
            ),
        role: yup.string().required("Xin vui chọn vai trò"),
        fullname: yup.string().required("Xin vui lòng nhập tên"),
        phone: yup
            .string()
            .required("Vui lòng nhập số điện thoại")
            .matches(/^[0-9]+$/, "Số điện thoại phải là chữ số"),
    });
    const { control, handleSubmit } = useForm<IUserDetail>({
        defaultValues: initData,
        resolver: yupResolver(schema),
    });
    function handleUpdateSubmit(data: IUserDetail) {
        onUpdate?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }
    return (
        <Dialog
            open={showUserUpdateForm}
            keepMounted={false}
            onClose={handleClose2}
            // maxWidth="lg"
            aria-labelledby="update-User"
            aria-describedby="update-User"
        >
            <Box
                component="form"
                // onSubmit={}

                onSubmit={handleSubmit(handleUpdateSubmit)}
            >
                <DialogTitle
                    id="update-user"
                    display="flex"
                    sx={{ justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        Cập nhật tài khoản
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}></Grid>
                        {/* fullname: string;
                        phone: string;
                        username: string;
                        role: string;
                        email: string;
                        date?: Date;
                        avatar?: string;

                        status: string; */}
                        <Grid item xs={12} md={6}>
                            <InputField
                                type="text"
                                name="fullname"
                                control={control}
                                label="Tên"
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
                        <Grid item xs={12} md={6}>
                            <InputField
                                type="text"
                                label="Số điện thoại"
                                name="phone"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <SelectFieldNormal
                                allOptions={Role_List}
                                control={control}
                                label="Vai trò"
                                name="role"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <SelectFieldNormal
                                allOptions={StatusAccount}
                                control={control}
                                label="Trạng thái"
                                name="status"
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
