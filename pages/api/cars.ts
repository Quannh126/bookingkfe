import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
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
    if (req.method !== "GET") {
        return res.status(409).json({ message: "Method not supported" });
    }

    if (req.method === "GET") {
        return new Promise((resolve) => {
            req.headers.cookie = "";
            const handleSearchRespone: ProxyResCallback = (
                proxyRes,
                req,
                res
            ) => {
                let body = "";
                proxyRes.on("data", (chunk) => {
                    body += chunk;
                });

                proxyRes.on("end", () => {
                    try {
                        const { listCar, message } = JSON.parse(body);

                        if (!listCar) {
                            (res as NextApiResponse)
                                .status(Number(proxyRes.statusCode))
                                .json({ message: message });
                        } else {
                            (res as NextApiResponse)
                                .status(200)
                                .json({ listCar: listCar });
                        }
                    } catch (err) {
                        (res as NextApiResponse)
                            .status(500)
                            .json("Something went wrong");
                    }
                    resolve(true);
                });
            };
            proxy.once("proxyRes", handleSearchRespone);
            proxy.web(req, res, {
                target: process.env.API_URL,
                changeOrigin: true,
                selfHandleResponse: true,
            });
        });
    }
}
