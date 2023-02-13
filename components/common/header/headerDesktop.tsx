import * as React from "react";
import { Box } from "@mui/system";
import { Container, Stack, Link } from "@mui/material";
import { ROUTE_LIST } from "../../../config/routes";
import { useRouter } from "next/router";
import clsx from "clsx";
export interface IHeaderDesktopProps {}

export default function HeaderDesktop() {
    const router = useRouter();
    return (
        <Box
            display={{ xs: "none", lg: "block" }}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                boxShadow: "none",
                borderBottom: "1px solid rgba(250, 250, 250, 0.3)",
            }}
        >
            <Container
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Stack direction="row" justifyContent="flex-start">
                    <Link
                        href="/"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Box
                            component="img"
                            src="/logo2.png"
                            sx={{
                                width: "auto",
                                height: "50px",
                            }}
                        ></Box>
                    </Link>
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                    {ROUTE_LIST.map((route) => (
                        <Link
                            sx={{
                                height: "70px",
                                ml: 2,
                                pl: "0.85em",
                                pr: "0.85em",
                                display: "flex",
                                alignItems: "center",
                            }}
                            key={route?.path}
                            href={route.path}
                            className={clsx({
                                active: router.pathname === route.path,
                            })}
                        >
                            {route?.label}
                        </Link>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}
