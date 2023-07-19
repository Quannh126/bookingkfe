import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import {
    IconButton,
    InputAdornment,
    Button,
    Typography,
    CardContent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginPayload } from "@/models";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PureLightTheme } from "@/utils";
export interface LoginFormProps {
    // eslint-disable-next-line no-unused-vars
    onSubmit?: (payload: LoginPayload) => void;
}
export function LoginForm({ onSubmit }: LoginFormProps) {
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
        ////console.log(payload);
        onSubmit?.(payload);
    }
    return (
        <CardContent>
            <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
                <Typography
                    component="h1"
                    variant="h3"
                    sx={{ paddingBottom: PureLightTheme.spacing(4) }}
                >
                    Đăng nhập
                </Typography>

                <InputField
                    type="text"
                    name="username"
                    control={control}
                    label="Tên đăng nhập"
                    size="medium"
                    sx={{ marginBottom: PureLightTheme.spacing(2) }}
                />
                <InputField
                    size="medium"
                    type={showPassword ? "text" : "password"}
                    sx={{ marginBottom: PureLightTheme.spacing(2) }}
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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="medium"
                >
                    Login
                </Button>
            </Box>
        </CardContent>
    );
}
