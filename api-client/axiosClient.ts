import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.API_URL + "/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Cho phép trình duyệt gửi cookie cùng với req
});
export const axiosClientFile = axios.create({
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
});
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        // if (error.response.status === 401) {
        //     // console.error("Login plz", window.location.href);
        //     window.location.href = `/login?from=${encodeURIComponent(
        //         window.location.href
        //     )}`;
        // }

        return Promise.reject(error);
    }
);
axiosClientFile.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);
