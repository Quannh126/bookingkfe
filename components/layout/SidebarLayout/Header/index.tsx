// import { useContext } from "react";

import {
    Box,
    alpha,
    Stack,
    lighten,
    Divider,
    IconButton,
    Tooltip,
    styled,
    useTheme,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";

import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

// import { SidebarContext } from "@/components/contexts/SidebarContext";
import { PureLightTheme } from "@/utils";
import HeaderUserbox from "./Userbox";
import HeaderButtons from "./Buttons";
// import HeaderMenu from "./Menu";
import { toggleSidebar, selectMenuState } from "@/redux/selectedMenu";
import { useSelector, useDispatch } from "react-redux";
const HeaderWrapper = styled(Box)(
    ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 9;
        background-color: ${alpha("#fbf9fb", 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${PureLightTheme.sidebar.width};
            width: auto;
        }
`
);

export default function Header() {
    // const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    const theme = useTheme();
    const dispatch = useDispatch();
    const status = useSelector(selectMenuState);

    return (
        <HeaderWrapper
            display="flex"
            alignItems="center"
            sx={{
                boxShadow:
                    theme.palette.mode === "dark"
                        ? `0 1px 0 ${alpha(
                              lighten(theme.colors.primary.main, 0.7),
                              0.15
                          )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
                        : `0px 2px 8px -3px ${alpha(
                              theme.colors.alpha.black[100],
                              0.2
                          )}, 0px 5px 22px -4px ${alpha(
                              theme.colors.alpha.black[100],
                              0.1
                          )}`,
            }}
        >
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center"
                spacing={2}
            >
                {/* <HeaderMenu /> */}
            </Stack>
            <Box display="flex" alignItems="center">
                <HeaderButtons />
                <Box
                    component="span"
                    sx={{
                        ml: 2,
                        display: { lg: "none", xs: "inline-block" },
                    }}
                >
                    <Tooltip arrow title="Toggle Menu">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                console.log("click");
                                dispatch(toggleSidebar());
                            }}
                        >
                            {!status ? (
                                <MenuTwoToneIcon fontSize="small" />
                            ) : (
                                <CloseTwoToneIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                </Box>
                <HeaderUserbox />
            </Box>
        </HeaderWrapper>
    );
}
