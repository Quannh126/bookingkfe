import { useAuth } from "@/hooks";
import React, { useState } from "react";
import { LoginForm } from "@/components/auth";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
// import { DialogTitle, Button } from "@mui/material";
import { LoginPayload } from "@/models";
import { useRouter } from "next/router";
import { setCredentials } from "@/redux/selectedAuth";
import { useDispatch } from "react-redux";
import EmptyLayout from "@/components/layout/empty";
import { useEffect } from "react";
// import AdminLayout from "@/components/layout/admin";
export interface ILoginPage {}
export default function LoginPage() {
    // console.log("login page");
    const router = useRouter();
    const { login } = useAuth({
        revalidateOnMount: false,
    });
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");
    // async function handelLoginSubmit(payload: LoginPayload) {
    //     try {
    //         const res = await login(payload);
    //         // console.log(res);
    //         router.push("/admin");
    //         dispatch(setCredentials(res.accessToken));
    //     } catch (error) {
    //         // console.log(error);
    //         setErrorMsg("Tên đăng nhập hoặc mật khẩu không đúng");
    //     }
    // }
    const handleSubmit = async (payload: LoginPayload) => {
        try {
            const res = await login(payload);
            router.push("/admin");
            dispatch(setCredentials(res.accessToken));
        } catch (error) {
            // console.log(error);
            setErrorMsg("Tên đăng nhập hoặc mật khẩu không đúng");
        }
    };

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch("/admin");
    }, [router]);

    return (
        <Box>
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
                <LoginForm onSubmit={handleSubmit} errorMsg={errorMsg} />
            </Paper>
        </Box>
    );
}
LoginPage.Layout = EmptyLayout;
