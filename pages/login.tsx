import { useAuth } from "@/hooks/index";
import * as React from "react";

export interface ILoginPage {}

export default function LoginPage() {
    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });
    async function handelLoginClick() {
        try {
            await login();
        } catch (error) {
            console.log("failed to login");
        }
    }
    async function handelLogoutClick() {
        try {
            await logout();
        } catch (err) {
            console.log("failed to logut");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <p>Profile {JSON.stringify(profile || {}, null, 4)}</p>
            <button onClick={handelLoginClick}>Login</button>
            <button onClick={handelLogoutClick}>Logout</button>
        </div>
    );
}
