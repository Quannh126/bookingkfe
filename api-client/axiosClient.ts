import axios, { AxiosError } from "axios";
require("dotenv").config();
import Router from "next/router";
import { GetServerSidePropsContext } from "next";
// import { store } from "@/redux/store";
// import { selectAuthState, setCredentials } from "@/redux/selectedAuth";
const isServer = () => {
    return typeof window === "undefined";
};

let accessToken = "";
let context = <GetServerSidePropsContext>{};
export const setAccessToken = (_accessToken: string) => {
    accessToken = _accessToken;
};

export const getAccessToken = () => accessToken;
export const setContext = (_context: GetServerSidePropsContext) => {
    context = _context;
};
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

let fetchingToken = false;

// eslint-disable-next-line no-unused-vars
let subscribers: ((token: string) => any)[] = [];
const onAccessTokenFetched = (token: string) => {
    subscribers.forEach((callback) => callback(token));
    subscribers = [];
};
// eslint-disable-next-line no-unused-vars
const addSubscriber = (callback: (token: string) => any) => {
    subscribers.push(callback);
};

const refreshToken = async (oError: AxiosError) => {
    try {
        const { response } = oError;

        // create new Promise to retry original request
        const retryOriginalRequest = new Promise((resolve) => {
            addSubscriber((token: string) => {
                axiosClient.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;

                resolve(axios(response!.config));
            });
        });

        // check whether refreshing token or not
        if (!fetchingToken) {
            fetchingToken = true;

            // refresh token
            const res: any = await axiosClient.post(
                process.env.API_URL + "/api/v1/auth/refresh"
            );

            // store.dispatch(setCredentials(res.accessToken));
            // check if this is server or not. We don't wanna save response token on server.
            if (!isServer) {
                setAccessToken(res.accessToken);
            }
            // when new token arrives, retry old requests
            onAccessTokenFetched(res.accessToken);
        }
        return retryOriginalRequest;
    } catch (error) {
        // on error go to login page
        if (!Router.asPath.includes("/login")) {
            Router.push(`/login?from=${encodeURIComponent(Router.asPath)}`);
        }
        if (isServer()) {
            context.res.setHeader("location", "/login");
            context.res.statusCode = 302;
            context.res.end();
        }
        return Promise.reject(oError);
    } finally {
        fetchingToken = false;
    }
};

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error: AxiosError) => {
        // check conditions to refresh token
        if (
            error.response?.status === 401 &&
            !error.response?.config?.url?.includes("auth/refresh") &&
            !error.response?.config?.url?.includes("/login")
        ) {
            return refreshToken(error);
        }

        return Promise.reject(error.response?.data);
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
