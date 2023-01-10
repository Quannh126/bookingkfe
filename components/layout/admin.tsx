import * as React from "react";
import { LayoutProps } from "@/models";
import Auth from "../common/auth";
import { Stack, Box } from "@mui/material";

import SideBar from "../common/header/SideBar";

import { Footer } from "../common";
export default function AdminLayout({ children }: LayoutProps) {
    return (
        <Auth>
            <Stack minHeight="100vh" sx={{}}>
                <SideBar />
                <Box
                    component="main"
                    flexGrow={1}
                    sx={{
                        position: "relative",
                        zIndex: 5,
                        display: "block",
                        flex: 1,
                        pt: "70px",
                        ml: "200px",
                    }}
                >
                    {children}
                </Box>
                <Footer isSideBar={true} />
            </Stack>
        </Auth>
    );
}
