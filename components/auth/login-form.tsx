import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import { IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginPayload } from "@/models";
import yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export interface LoginFormProps {
    // eslint-disable-next-line no-unused-vars
    onSubmit?: (payload: LoginPayload) => void;
}
export function LoginForm({ onSubmit }: LoginFormProps) {
    const schema = yup.object().shape({
        username: yup
            .string()
            .required("Please enter username")
            .min(4, "Username is required to have at least 4 characters"),
        password: yup
            .string()
            .required("Please enter username")
            .min(6, "Username is required to have at least 6 characters"),
    });
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit } = useForm<LoginPayload>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });
    function handleLoginSubmit(payload: LoginPayload) {
        console.log(payload);
        onSubmit?.(payload);
    }
    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField
                type="text"
                name="email"
                control={control}
                label="Email"
            />
            <InputField
                type={showPassword ? "text" : "password"}
                name="password"
                control={control}
                label="Password"
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
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </Box>
    );
}
