import { useAuth } from "@/hooks";

import { LoginForm } from "@/components/auth";
import { Container, Paper } from "@mui/material";
// import { Box } from "@mui/system";
// import { DialogTitle, Button } from "@mui/material";
import { LoginPayload } from "@/models";
import { useRouter } from "next/router";
import { setCredentials } from "@/redux/selectedAuth";
import { useDispatch } from "react-redux";
// import EmptyLayout from "@/components/layout/empty";
import { useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import { toast } from "react-toastify";
import { PureLightTheme, getErrorMessage } from "@/utils";
// import AdminLayout from "@/components/layout/admin";
export interface ILoginPage {}
export default function LoginPage() {
    // console.log("login page");
    const router = useRouter();
    const { login } = useAuth({
        revalidateOnMount: false,
    });
    const dispatch = useDispatch();

    const handleSubmit = async (payload: LoginPayload) => {
        try {
            const res = await login(payload);
            router.push("/admin");
            dispatch(setCredentials(res.accessToken));
        } catch (error: any) {
            // console.log(error);
            // setErrorMsg("Tên đăng nhập hoặc mật khẩu không đúng");
            const msg = getErrorMessage(error);
            toast.error(msg);
        }
    };

    useEffect(() => {
        router.prefetch("/admin");
    }, [router]);

    return (
        <Container maxWidth="lg" sx={{ mt: PureLightTheme.spacing(25) }}>
            <Paper
                elevation={4}
                sx={{
                    mx: "auto",
                    p: 4,
                    maxWidth: "480px",
                    textAlign: "center",
                }}
            >
                <LoginForm onSubmit={handleSubmit} />
            </Paper>
        </Container>
    );
}
LoginPage.Layout = BaseLayout;
