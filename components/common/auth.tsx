import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import LoadingPage from "./loading";
// import { useSelector } from "react-redux";
// import { selectAuthState } from "@/redux/selectedAuth";
export interface AuthProp {
    children: ReactElement;
}

export default function Auth({ children }: AuthProp) {
    // const router = useRouter();
    const { profile } = useAuth();
    // const token = useSelector(selectAuthState);
    // const [calledPush, setCalledPush] = useState(false);
    // useEffect(() => {
    //     if (
    //         !firstLoading &&
    //         !profile?.username
    //         //&& profile?.username === "adminBooking"
    //     ) {
    //         // console.log(router.asPath);
    //         // if (calledPush) {
    //         //     return;
    //         // }
    //         // router.push(`/login?from=${encodeURIComponent(router.asPath)}`);
    //         // //router.push("/login");
    //         // setCalledPush(true);
    //     }
    // }, [router, profile, firstLoading]);

    if (!profile?.username) {
        return <LoadingPage />;
    }

    return <>{children}</>;
}
