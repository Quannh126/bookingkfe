import * as React from "react";
import { LayoutProps } from "@/models";
import Auth from "../common/auth";
import { Stack, Box } from "@mui/material";
import { Footer, HeaderAdminPage } from "../common";
export default function AdminLayout({ children }: LayoutProps) {
    return (
        <Auth>
            <Stack minHeight="100vh">
                <HeaderAdminPage />
                <Box component="main" flexGrow={1}>
                    {children}
                </Box>
                <Footer />
            </Stack>
        </Auth>
    );
}
