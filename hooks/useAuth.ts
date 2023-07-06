// import { authApi } from "@/api";
import { authApi } from "@/api";
import { LoginPayload, RespAuthData, UserProfile } from "@/models";
// import { useRouter } from "next/router";
import useSWR from "swr";
import { useRouter } from "next/router";
// import { useSelector } from "react-redux";
// import { selectAuthState } from "@/redux/selectedAuth";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
// import jwtDecode from "jwt-decode";
import { StorageKeys } from "@/constants";
const LOGIN_PAGE = "/login";
// const ADMIN_PAGE = "/admin";
// const PUBLIC_PAGE = "/";

export interface IProfile {
    fullname: string;
    username: string;
    role: string;
    avatar: string;
    phone: string;
}

function getUserInfo(): UserProfile | null {
    try {
        return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || "");
    } catch (error) {
        // console.log('failed to parse user info from local storage', error)
        return null;
    }
}
export function useAuth(options?: Partial<PublicConfiguration>) {
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        shouldRetryOnError: true,
        ...options,
        fallbackData: getUserInfo(),
        onSuccess(data) {
            // save user info to local storage
            localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data));
        },
        onError(err) {
            // failed to get profile --> logout
            console.log(err); // send error log to server if any
            logout();
        },
    };
    const router = useRouter();
    // const token: string = useSelector(selectAuthState);
    // let isManager = false;
    // let isAdmin = false;
    // let status = "Employee";
    // if (token) {
    //     const decoded = jwtDecode(token);
    //     const { role } = decoded;
    //     isManager = role.includes("MANAGER");
    //     isAdmin = role.includes("ADMIN");
    // }
    const {
        data: profile,
        error,
        mutate,
    } = useSWR<IProfile, Error>("/auth", config);
    const firstLoading = profile === undefined && error === undefined;

    async function login(payload: LoginPayload): Promise<RespAuthData> {
        const response = await authApi.login(payload);
        await mutate();
        return response as RespAuthData;
    }

    async function logout() {
        await authApi.logout();
        mutate(undefined, false);
        router.push(LOGIN_PAGE);
        localStorage.removeItem(StorageKeys.USER_INFO);
    }
    return {
        profile,

        error,
        mutate,
        login,
        logout,
        firstLoading,
    };
}
