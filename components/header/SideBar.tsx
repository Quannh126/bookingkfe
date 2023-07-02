import React from "react";
import { Box } from "@mui/system";
import { List, ListItem, Button } from "@mui/material";
import {
    ROUTE_ADMIN,
    ROUTE_MANAGER,
    ROUTE_TICKETING,
} from "../../config/routes";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useAuth } from "@/hooks";
import { PureLightTheme } from "@/utils";
import NotFoundPage from "../common/404";
interface RouteType {
    label: string;
    path: string;
    title: string;
}
export default function SideBar() {
    const router = useRouter();
    const { logout, profile } = useAuth({
        revalidateOnMount: false,
    });

    let menu: RouteType[] = [];
    if (!profile) {
        return <NotFoundPage></NotFoundPage>;
    } else {
        if (profile.role == "ADMIN") {
            menu = ROUTE_ADMIN;
        } else if (profile.role == "MANAGER") {
            menu = ROUTE_MANAGER;
        } else if (profile.role == "TICKETING_STAFF") {
            menu = ROUTE_TICKETING;
        }
    }
    async function handelLogoutClick() {
        try {
            ////console.log("Logout");
            await logout();
            router.push("/login");
        } catch (err) {
            //console.log("failed to logut");
        }
    }
    async function handelRoute(path: string) {
        try {
            router.push(path);
        } catch (error) {
            //console.log("failed router");
        }
    }
    return (
        <Box>
            <Box
                sx={{
                    width: PureLightTheme.sidebar.width,
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
                    {menu.map((route, index) => (
                        <ListItem
                            sx={{
                                width: "100%",
                                textAlign: "left",
                            }}
                            component="div"
                            key={index}
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
