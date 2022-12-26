import { LoginPayload } from "@/models/auth";
import { axiosClient } from "./axiosClient";
export const authApi = {
    login(payload: LoginPayload) {
        return axiosClient.post("/auth", payload);
    },

    logout() {
        return axiosClient.post("/logout");
    },
};
