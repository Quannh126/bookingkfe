import MainLayout from "@/components/layout/main";
import { useAuth } from "@/hooks";
import React from "react";
import { LoginForm } from "@/components/auth";

// import { DialogTitle, Button } from "@mui/material";
import { LoginPayload } from "@/models";
export interface ILoginPage {}

export default function LoginPage() {
    const { login, logout } = useAuth({
        revalidateOnMount: false,
    });

    async function handelLogoutClick() {
        try {
            await logout();
        } catch (err) {
            console.log("failed to logut");
        }
    }

    async function handelLoginSubmit(payload: LoginPayload) {
        try {
            await login(payload);
        } catch (error) {
            console.log("failed to login");
        }
    }
    return (
        <div>
            <button onClick={handelLogoutClick}>Logout</button>
            <LoginForm onSubmit={handelLoginSubmit} />
        </div>
    );
}
LoginPage.Layout = MainLayout;
