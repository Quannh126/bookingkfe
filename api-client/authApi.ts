import { LoginPayload } from "@/models/auth";
import { axiosClient } from "./axiosClient";
// import { store } from "@/redux/store";
// import { setCredentials } from "@/redux/selectedAuth";
// import { setCredentials, logout } from "@/redux/selectedAuth";
// import { useDispatch } from "react-redux";
export const authApi = {
    login(payload: LoginPayload) {
        return new Promise((resolve, reject) => {
            axiosClient
                .post("/auth", payload)
                .then((response: any) => {
                    //store.dispatch(setCredentials(response.accessToken));

                    axiosClient.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${response.accessToken}`;

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
