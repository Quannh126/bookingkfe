// import { authApi } from "@/api";
import { authApi } from "@/api";
import { LoginPayload } from "@/models";
// import { useRouter } from "next/router";
import useSWR from "swr";
import { useRouter } from "next/router";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
const LOGIN_PAGE = "/login";
const ADMIN_PAGE = "/admin";
// const PUBLIC_PAGE = "/";

export interface IProfile {
    fullname: string;
    username: string;
    role: string;
    avatar: string;
    phone: string;
}
export function useAuth(options?: Partial<PublicConfiguration>) {
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        shouldRetryOnError: true,
        ...options,
    };
    const router = useRouter();
    const {
        data: profile,
        error,
        mutate,
    } = useSWR<IProfile, Error>("/auth", config);
    const firstLoading = profile === undefined && error === undefined;
    async function login(payload: LoginPayload) {
        await authApi.login(payload);
        router.push(ADMIN_PAGE);
        mutate();
    }

    async function logout() {
        await authApi.logout();
        mutate(undefined, false);
        router.push(LOGIN_PAGE);
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
