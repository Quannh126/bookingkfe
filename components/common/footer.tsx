import * as React from "react";
import { Box, Icon, Stack, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import clsx from "clsx";
export interface IFooterProps {
    isSideBar: boolean;
}

export function Footer({ isSideBar }: IFooterProps) {
    const link = [
        { icon: Facebook, url: "" },
        { icon: Instagram, url: "" },
        { icon: Twitter, url: "" },
    ];
    return (
        <Box
            component="footer"
            className={clsx({
                havesidebar: isSideBar,
            })}
            py={2}
            textAlign="center"
        >
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
