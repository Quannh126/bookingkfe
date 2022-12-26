import * as React from "react";
import { Box } from "@mui/system";
import { Container, Stack, Link } from "@mui/material";
import { ROUTE_ADMIN } from "./routes";
import { useRouter } from "next/router";
import clsx from "clsx";
export interface IHeaderDesktopProps {}

export default function HeaderAdmin() {
    const router = useRouter();
    return (
        <Box display={{ xs: "none", lg: "block" }}>
            <Container>
                <Stack direction="row" justifyContent="flex-end">
                    {ROUTE_ADMIN.map((route) => (
                        <Link
                            sx={{ ml: 2 }}
                            key={route?.path}
                            href={route.path}
                            underline="hover"
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
