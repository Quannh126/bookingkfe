import {
    Box,
    Drawer,
    alpha,
    styled,
    Divider,
    useTheme,
    Button,
    lighten,
    darken,
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";

import Scrollbar from "@/components/Scrollbar";
// import { SidebarContext } from "@/components/contexts/SidebarContext";
// import Logo from "@/components/Logo";
import { useAuth } from "@/hooks";
import { logout } from "@/redux/selectedAuth";

import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { toggleSidebar, selectMenuState } from "@/redux/selectedMenu";
import { useSelector, useDispatch } from "react-redux";
const SidebarWrapper = styled(Box)(
    ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
    // const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    const closeSidebar = () => {
        console.log("Tg");
        dispatch(toggleSidebar());
    };
    const dispatch = useDispatch();
    const status = useSelector(selectMenuState);
    const theme = useTheme();

    const { logout: logoutHook, profile: user } = useAuth({
        revalidateOnMount: false,
    });

    const handleLogout = (): void => {
        logoutHook();
        dispatch(logout());
    };
    return (
        <>
            <SidebarWrapper
                sx={{
                    display: {
                        xs: "none",
                        lg: "inline-block",
                    },
                    position: "fixed",
                    left: 0,
                    top: 0,
                    background:
                        theme.palette.mode === "dark"
                            ? alpha(lighten(theme.header.background, 0.1), 0.5)
                            : darken(theme.colors.alpha.black[100], 0.5),
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? theme.sidebar.boxShadow
                            : "none",
                }}
            >
                <Scrollbar>
                    <Box mt={3}>
                        <Box mx={2} sx={{ display: "flex" }}>
                            <Box>
                                <Box
                                    component="img"
                                    src={user?.avatar}
                                    sx={{
                                        borderRadius: "50% !important",

                                        maxWidth: { xs: 50, md: 50 },
                                    }}
                                    alt="Avatar"
                                />
                            </Box>
                            <Box sx={{ padding: "5px 5px 5px 15px" }}>
                                <Box sx={{ m: 0 }}>{user?.fullname}</Box>
                                <Box component="a">
                                    <Box component="i" className="fa">
                                        {user?.role}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Divider
                        sx={{
                            mt: theme.spacing(3),
                            mx: theme.spacing(2),
                            background: theme.colors.alpha.trueWhite[10],
                        }}
                    />
                    <SidebarMenu />
                </Scrollbar>
                <Divider
                    sx={{
                        background: theme.colors.alpha.trueWhite[10],
                    }}
                />
                <Box p={2}>
                    <Button
                        onClick={() => {
                            handleLogout;
                            closeSidebar;
                        }}
                        sx={{
                            display: "box",
                            width: "100%",
                            justifyContent: "left",
                            padding: theme.spacing(1.2, 3),
                        }}
                        disableRipple
                        component="a"
                        color="error"
                        startIcon={<LogoutTwoToneIcon />}
                    >
                        Đăng xuất
                    </Button>
                </Box>
            </SidebarWrapper>
            <Drawer
                sx={{
                    boxShadow: `${theme.sidebar.boxShadow}`,
                }}
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={status}
                onClose={closeSidebar}
                variant="temporary"
            >
                <SidebarWrapper
                    sx={{
                        background:
                            theme.palette.mode === "dark"
                                ? theme.colors.alpha.white[100]
                                : darken(theme.colors.alpha.black[100], 0.5),
                    }}
                >
                    <Scrollbar>
                        <Box mt={3}>
                            <Box mx={2} sx={{ display: "flex" }}>
                                <Box>
                                    <Box
                                        component="img"
                                        src={user?.avatar}
                                        sx={{
                                            borderRadius: "50% !important",

                                            maxWidth: { xs: 50, md: 50 },
                                        }}
                                        alt="Avatar"
                                    />
                                </Box>
                                <Box sx={{ padding: "5px 5px 5px 15px" }}>
                                    <Box sx={{ m: 0 }}>{user?.fullname}</Box>
                                    <Box component="a">
                                        <Box component="i" className="fa">
                                            {user?.role}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Divider
                            sx={{
                                mt: theme.spacing(3),
                                mx: theme.spacing(2),
                                background: theme.colors.alpha.trueWhite[10],
                            }}
                        />

                        <SidebarMenu />
                    </Scrollbar>
                    <Divider
                        sx={{
                            background: theme.colors.alpha.trueWhite[10],
                        }}
                    />
                    <Box p={2}>
                        <Button
                            onClick={() => {
                                handleLogout;
                                closeSidebar;
                            }}
                            sx={{
                                display: "box",
                                width: "100%",
                                justifyContent: "left",
                                padding: theme.spacing(1.2, 3),
                            }}
                            disableRipple
                            component="a"
                            color="error"
                            startIcon={<LogoutTwoToneIcon />}
                        >
                            Đăng xuất
                        </Button>
                    </Box>
                </SidebarWrapper>
            </Drawer>
        </>
    );
}

export default Sidebar;
