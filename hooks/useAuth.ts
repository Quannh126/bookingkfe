// import { authApi } from "@/api";
import { authApi } from "@/api";
import { LoginPayload } from "@/models";
import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
export interface IProfile {
    name: string;
    username: string;
    avatar: string;
    phone: string;
}
export function useAuth(options?: Partial<PublicConfiguration>) {
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    };
    const {
        data: profile,
        error,
        mutate,
    } = useSWR<IProfile, Error>("/auth", null, config);
    const firstLoading = profile === undefined && error === undefined;
    async function login(payload: LoginPayload) {
        await authApi.login(payload);
        await mutate();
    }

    async function logout() {
        await authApi.logout();
        mutate(undefined, false);
    }
    return {
        profile,
        error,
        login,
        logout,
        firstLoading,
    };
}
