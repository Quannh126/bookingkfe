import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/router";
import React, {
    ReactElement,
    // useEffect,
    // useState
} from "react";
import LoadingPage from "./loading";
// import { useRouter } from "next/router";
// import { useSelector } from "react-redux";
// import { selectAuthState } from "@/redux/selectedAuth";
export interface AuthProp {
    children: ReactElement;
}

export default function Auth({ children }: AuthProp) {
    // const router = useRouter();
    const { profile, firstLoading } = useAuth();
    // const token = useSelector(selectAuthState);

    // useEffect(() => {
    //     if (
    //         !firstLoading &&
    //         !profile?.username
    //         //&& profile?.username === "adminBooking"
    //     ) {
    //         // console.log(router.asPath);

    //         router.push(`/login?from=${encodeURIComponent(router.asPath)}`);
    //         //router.push("/login");
    //     }
    // }, [router, profile, firstLoading]);

    if (!profile?.username || firstLoading) {
        return <LoadingPage />;
    }

    return <>{children}</>;
}
