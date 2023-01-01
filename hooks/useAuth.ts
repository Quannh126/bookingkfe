// import { authApi } from "@/api";
import { authApi } from "@/api";
import { LoginPayload } from "@/models";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
export function useAuth(options?: Partial<PublicConfiguration>) {
    const {
        data: profile,
        error,
        mutate,
    } = useSWR("/auth", {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        //revalidateOnMount: false,
        ...options,
    });
    const firstLoading = profile === undefined && error === undefined;
    async function login(payload: LoginPayload) {
        await authApi.login(payload);
        await mutate();
    }

    async function logout() {
        await authApi.logout();
        mutate({}, false);
    }
    return {
        profile,
        error,
        login,
        logout,
        firstLoading,
    };
}
