import MainLayout from "@/components/layout/main";
import { useAuth } from "@/hooks";
import React, { useState } from "react";
import { LoginForm } from "@/components/auth";
import { Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
// import { DialogTitle, Button } from "@mui/material";
import { LoginPayload } from "@/models";
import { useRouter } from "next/router";

// import AdminLayout from "@/components/layout/admin";
export interface ILoginPage {}

export default function LoginPage() {
    const { login, profile } = useAuth({
        revalidateOnMount: false,
    });
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    async function handelLoginSubmit(payload: LoginPayload) {
        try {
            await login(payload);
            console.log(profile);
            // router.replace(
            //     router.query.from
            //         ? decodeURIComponent(router.query.from.toString())
            //         : "/admin"
            // );
            if (profile?.username === "Admin") {
                router.replace(
                    router.query.from
                        ? decodeURIComponent(router.query.from.toString())
                        : "/admin"
                );
            } else {
                router.replace(
                    router.query.from
                        ? decodeURIComponent(router.query.from.toString())
                        : "/"
                );
            }
        } catch (error) {
            setErrorMsg("Sai rồi");
        }
    }
    return (
        <Box>
            <Typography component="h1" variant="h4" p={2}>
                Login
            </Typography>
            <Paper
                elevation={4}
                sx={{
                    mx: "auto",
                    mt: 20,
                    p: 4,
                    maxWidth: "480px",
                    textAlign: "center",
                }}
            >
                <LoginForm onSubmit={handelLoginSubmit} errorMsg={errorMsg} />
            </Paper>
        </Box>
    );
}
LoginPage.Layout = MainLayout;
