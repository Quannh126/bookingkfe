import { LoginPayload } from "@/models/auth";
import { axiosClient } from "./axiosClient";
// import { setCredentials, logout } from "@/redux/selectedAuth";
// import { useDispatch } from "react-redux";
export const authApi = {
    login(payload: LoginPayload) {
        return new Promise((resolve, reject) => {
            axiosClient
                .post("/auth", payload)
                .then((response: any) => {
                    const { accessToken } = response;
                    console.log(accessToken);

                    axiosClient.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${accessToken}`;

                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    logout() {
        return axiosClient.post("/auth/logout").then(() => {});
    },
};
