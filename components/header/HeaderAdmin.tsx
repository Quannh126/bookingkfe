import * as React from "react";
import { Box } from "@mui/system";
import { Divider, Stack, Link, alpha } from "@mui/material";
import { ROUTE_HEADER_ADMIN } from "../../config/routes";
import { useRouter } from "next/router";
import clsx from "clsx";

export function HeaderAdmin() {
    const router = useRouter();
    const color1 = alpha("#223354", 0.2);
    const color2 = alpha("#223354", 0.1);
    return (
        <Box
            display={{ xs: "none", lg: "block" }}
            sx={{
                backgroundColor: `${alpha("#FFFFF", 0.95)}`,
                color: "#6E759F",
                position: "absolute",
                right: 0,
                left: "218px",
                width: "auto",
                zIndex: 6,
                borderBottom: "1px solid rgba(250, 250, 250, 0.3)",
                backdropFilter: "blur(3px)",
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                boxShadow: `0px 2px 8px -3px ,${color1} 0px 5px 22px -4px ${color2}`,
            }}
        >
            <Stack direction="row" justifyContent="flex-start">
                <Link href="/" sx={{ display: "flex", alignItems: "center" }}>
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
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center"
                spacing={2}
            >
                {ROUTE_HEADER_ADMIN.map((route) => (
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
        </Box>
    );
}
