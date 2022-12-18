import authApi from "@/api/authApi";
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
        ...options,
    });
    const firstLoading = profile === undefined && error === undefined;
    async function login() {
        await authApi.login({
            email: "Quannh123625@gmail.com",
            password: "123456789",
        });
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
