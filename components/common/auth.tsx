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
        console.log(!firstLoading && !profile?.username);
        console.log(firstLoading);
        console.log(profile);

        if (
            !firstLoading &&
            !profile?.username
            //&& profile?.username === "adminBooking"
        ) {
            router.push(`/login?from=${encodeURIComponent(router.asPath)}`);
            //router.push("/login");
        }
    }, [router, profile, firstLoading]);

    if (!profile?.username) {
        return <LoadingPage />;
    }

    return <>{children}</>;
}
