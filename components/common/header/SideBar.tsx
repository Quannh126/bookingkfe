import React from "react";
import { Box } from "@mui/system";
import { List, ListItem, Button } from "@mui/material";
import { ROUTE_ADMIN } from "./routes";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useAuth } from "@/hooks";
export interface IHeaderDesktopProps {}

export default function SideBar() {
    const router = useRouter();
    const { logout } = useAuth({
        revalidateOnMount: false,
    });
    async function handelLogoutClick() {
        try {
            //console.log("Logout");
            await logout();
            router.push("/login");
        } catch (err) {
            console.log("failed to logut");
        }
    }
    async function handelRoute(path: string) {
        try {
            router.push(path);
        } catch (error) {
            console.log("failed router");
        }
    }
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
                                //href={route.path}
                                sx={{
                                    justifyContent: "flex-start",
                                    minWidth: "64px",
                                }}
                                onClick={() => handelRoute(route.path)}
                                className={clsx({
                                    active: router.pathname === route.path,
                                })}
                            >
                                {route?.label}
                            </Button>
                        </ListItem>
                    ))}
                    <ListItem>
                        <Button
                            component="a"
                            onClick={handelLogoutClick}
                            sx={{
                                justifyContent: "flex-start",
                                minWidth: "64px",
                            }}
                        >
                            Đăng xuất
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}
