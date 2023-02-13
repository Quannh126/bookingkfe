import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import { IconButton, InputAdornment, Button, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginPayload } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export interface LoginFormProps {
    errorMsg?: string;
    // eslint-disable-next-line no-unused-vars
    onSubmit?: (payload: LoginPayload) => void;
}
export function LoginForm({ onSubmit, errorMsg }: LoginFormProps) {
    const schema = yup.object().shape({
        username: yup.string().required("Xin hãy nhập tài khoản"),
        //.min(4, "Username is required to have at least 4 characters"),
        password: yup.string().required("Xin hãy nhập mật khẩu"),
    });
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit } = useForm<LoginPayload>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });
    function handleLoginSubmit(payload: LoginPayload) {
        //console.log(payload);
        onSubmit?.(payload);
    }
    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <Typography component="h1" variant="h4" p={2}>
                Đăng nhập
            </Typography>
            <InputField
                type="text"
                name="username"
                control={control}
                label="Tên đăng nhập"
            />
            <InputField
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
                                    setShowPassword((x: boolean) => !x)
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
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
                Login
            </Button>
        </Box>
    );
}
