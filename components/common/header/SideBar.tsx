import React from "react";
import { Box } from "@mui/system";
import { List, ListItem, Button } from "@mui/material";
import { ROUTE_ADMIN } from "./routes";
import { useRouter } from "next/router";
import clsx from "clsx";
export interface IHeaderDesktopProps {}

export default function SideBar() {
    const router = useRouter();

    return (
        <Box>
            <Box
                minWidth={200}
                sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    zIndex: "7",
                    height: "100%",
                    paddingBottom: "61px",
                    position: "fixed",
                    left: "0px",
                    top: "0px",
                    background: "rgb(17, 25, 42)",
                    boxShadow: "none",
                }}
            >
                <List
                    component="div"
                    sx={{
                        listStyle: "none",
                        margin: "0px",
                        position: "relative",
                    }}
                >
                    {ROUTE_ADMIN.map((route) => (
                        <ListItem
                            sx={{
                                width: "100%",
                                textAlign: "left",
                            }}
                            component="div"
                            key={route?.path}
                        >
                            <Button
                                component="a"
                                href={route.path}
                                sx={{
                                    justifyContent: "flex-start",
                                    minWidth: "64px",
                                }}
                                className={clsx({
                                    active: router.pathname === route.path,
                                })}
                            >
                                {route?.label}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}
