import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoadingPage from "./loading";

export interface AuthProp {
    children: any;
}

export default function Auth({ children }: AuthProp) {
    const router = useRouter();
    const { profile, firstLoading } = useAuth();
    useEffect(() => {
        if (!firstLoading && !profile?.username) router.push("/login");
    }, [router, profile, firstLoading]);
    if (!profile?.usename) {
        return LoadingPage;
    }
    return <>{children}</>;
}
