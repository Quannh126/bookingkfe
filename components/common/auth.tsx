import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import LoadingPage from "./loading";

export interface AuthProp {
    children: ReactElement;
}

export default function Auth({ children }: AuthProp) {
    const router = useRouter();
    const { profile, firstLoading } = useAuth();

    useEffect(() => {
        if (
            !firstLoading &&
            !profile?.username &&
            profile?.username === "adminBooking"
        )
            router.push("/");
    }, [router, profile, firstLoading]);
    if (process.env.NODE_ENV === "development") {
        return <>{children}</>;
    }
    if (!profile?.username) {
        return <LoadingPage />;
    }

    return <>{children}</>;
}
