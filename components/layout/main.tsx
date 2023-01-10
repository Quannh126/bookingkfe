import * as React from "react";
import { LayoutProps } from "@/models/index";

import { Stack, Box } from "@mui/material";
import { Footer, Header } from "../common";
export default function MainLayout({ children }: LayoutProps) {
    return (
        <Stack minHeight="100vh">
            <Header />
            <Box component="main" flexGrow={1}>
                {children}
            </Box>
            <Footer isSideBar={false} />
        </Stack>
    );
}
