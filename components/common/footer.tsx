import * as React from "react";
import { Box, Icon, Stack, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export interface IFooterProps {}

export function Footer() {
    const link = [
        { icon: Facebook, url: "" },
        { icon: Instagram, url: "" },
        { icon: Twitter, url: "" },
    ];
    return (
        <Box component="footer" py={2} textAlign="center">
            <Stack direction="row" justifyContent="center">
                {link.map((item, idx) => (
                    <Box
                        key={idx}
                        component="a"
                        p={2}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon component={item.icon} sx={{ fronSize: 48 }} />
                    </Box>
                ))}
            </Stack>
            <Typography>Copyright ©2022 All rights reserved</Typography>
        </Box>
    );
}
