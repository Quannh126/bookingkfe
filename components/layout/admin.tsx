import * as React from "react";
import { LayoutProps } from "@/models";
import Auth from "../common/auth";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

import SideBar from "../header/SideBar";

import { Footer } from "../common";
import Header from "./SidebarLayout/Header";
import { PureLightTheme } from "@/utils";

export default function AdminLayout({ children }: LayoutProps) {
    return (
        <Auth>
            <Stack minHeight="100vh" sx={{}}>
                <Header />
                <SideBar />
                <Box
                    component="main"
                    flexGrow={1}
                    sx={{
                        position: "relative",
                        display: "block",
                        flex: 1,
                        pt: PureLightTheme.header.height,
                        ml: PureLightTheme.sidebar.width,
                    }}
                >
                    {children}
                </Box>
                <Footer isSideBar={true} />
            </Stack>
        </Auth>
    );
}
