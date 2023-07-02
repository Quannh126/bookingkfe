import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

const proxy = httpProxy.createProxyServer();
export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // return new Promise((resolve) => {
    //     const cookies = new Cookies(req, res);
    //     const accessToken = cookies.get("accessToken");
    //     console.log("Token", accessToken);
    //     if (accessToken) {
    //         req.headers.authorization = `Bearer ${accessToken}`;
    //     }
    //     // req.headers.cookie = "";

    //     proxy.web(req, res, {
    //         target: process.env.API_URL,
    //         changeOrigin: true,
    //         selfHandleResponse: false,
    //     });
    //     proxy.once("proxyRes", () => {
    //         resolve(true);
    //     });
    // });
    return new Promise((resolve) => {
        // req.headers.cookie = "";
        const handleLoginRespone: ProxyResCallback = (proxyRes, req, res) => {
            let body = "";
            proxyRes.on("data", (chunk) => {
                body += chunk;
            });

            proxyRes.on("end", () => {
                try {
                    if (proxyRes.statusCode === 401) {
                    }
                    const { accessToken, expiredAt } = JSON.parse(body);
                    const { message } = JSON.parse(body);
                    const cookies = new Cookies(req, res, {
                        secure: process.env.NODE_ENV !== "development",
                    });

                    if (!accessToken || !expiredAt) {
                        (res as NextApiResponse)
                            .status(Number(proxyRes.statusCode))
                            .json({ message: message });
                    } else {
                        cookies.set("accessToken", accessToken, {
                            httpOnly: true,
                            sameSite: "lax",
                            expires: new Date(expiredAt),
                        });
                        (res as NextApiResponse)
                            .status(200)
                            .json({ token: accessToken });
                    }
                } catch (err) {
                    (res as NextApiResponse)
                        .status(500)
                        .json("Something went wrong");
                }
                resolve(true);
            });
        };
        proxy.once("proxyRes", handleLoginRespone);
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true,
        });
    });
}
