import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField, SelectFieldNormal } from "../form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import { IUserForm } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PureLightTheme } from "@/utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Role_List } from "@/config/type-sell";
// import FileUpload from "react-mui-fileuploader";
// import { UploadFileBox } from "../form/upload-file";

export interface userFormProps {
    errorMsg?: string;
    showUserForm: boolean;
    // eslint-disable-next-line no-unused-vars
    onAdd?: (data: IUserForm) => void;
    onCancel: () => void;
    // eslint-disable-next-line no-unused-vars
    handleClose: (event: Object, reason: string) => void;
}

export function UserForm({
    onAdd,
    onCancel,
    showUserForm,
    handleClose,
}: userFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const schema = yup.object().shape({
        username: yup
            .string()
            .required("Xin vui lòng nhập tên đăng nhập")
            .min(4, "Tên xe ít nhất có 4 kí tự"),
        password: yup
            .string()
            .required("Xin vui lòng nhập mật khẩu")
            .min(6, "Tên xe ít nhất có 6 kí tự"),
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
    const { control, handleSubmit } = useForm<IUserForm>({
        defaultValues: {
            username: "",
            fullname: "",
            phone: "",
            email: "",
            role: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });
    function handleAddSubmit(data: IUserForm) {
        //console.log(data);
        onAdd?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }
    return (
        <Dialog
            open={showUserForm}
            // TransitionComponent={Transition}
            keepMounted={false}
            onClose={handleClose}
            // maxWidth="lg"
            aria-labelledby="add-user"
            aria-describedby="add-user"
        >
            <Box
                component="form"
                // onSubmit={}
                onSubmit={handleSubmit(handleAddSubmit)}
            >
                <DialogTitle
                    id="add-user"
                    display="flex"
                    sx={{ justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        Thêm tài khoản
                    </Typography>
                </DialogTitle>
                <DialogContent
                    dividers={false}
                    sx={{ padding: PureLightTheme.spacing(4) }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}></Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                type="text"
                                name="username"
                                control={control}
                                label="Tên đăng nhập"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                // size="medium"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                control={control}
                                label="Mật khẩu"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (x: boolean) => !x
                                                    )
                                                }
                                                //onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                type="text"
                                label="Tên người dùng"
                                name="fullname"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputField
                                label="Email"
                                type="text"
                                name="email"
                                // multiline
                                // rows={4}
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                label="Số điện thoại"
                                type="text"
                                name="phone"
                                // multiline
                                // rows={4}
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SelectFieldNormal
                                allOptions={Role_List}
                                control={control}
                                label="Vai trò"
                                name="role"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ marginTop: 2 }}>
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
                            Đóng
                        </Button>
                    </Box>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
