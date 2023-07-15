import { useRouter } from "next/router";

import {
    // ListSubheader,
    alpha,
    List,
    styled,
    Button,
    ListItem,
    ListSubheader,
} from "@mui/material";
// import Box from "next/link";
import { Box } from "@mui/system";
// import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

// import { SidebarContext } from "@/components/contexts/SidebarContext";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { closeSidebar } from "@/redux/selectedMenu";
import { useDispatch } from "react-redux";
// import clsx from "clsx";
// import { ROUTE_ADMIN, ROUTE_MANAGER, ROUTE_TICKETING } from "@/config/routes";
import { Skeleton } from "@mui/material";
import { useAuth } from "@/hooks";
const MenuWrapper = styled(Box)(
    ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
    ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;
        display: -webkit-box;   
        
        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                    "transform",
                    "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
    const dispatch = useDispatch();
    // const status = useSelector(selectMenuState);
    const router = useRouter();

    // const currentRoute = router.pathname;
    const { profile } = useAuth({
        revalidateOnMount: false,
    });

    let permission: String[] = [];
    if (!profile) {
        return <Skeleton />;
    } else {
        if (profile.role == "Admin") {
            permission = ["Admin", "Booking", "Manager"];
        } else if (profile.role == "Manager") {
            permission = ["Booking", "Manager"];
        } else if (profile.role == "Employee") {
            permission = ["Booking"];
        }
    }

    const currentRoute = router.pathname;
    async function handelRoute(path: string) {
        try {
            router.push(path);
        } catch (error) {
            //console.log("failed router");
        }
    }
    return (
        <>
            <MenuWrapper>
                {permission.includes("Admin") && (
                    <List
                        component="div"
                        subheader={
                            <ListSubheader component="div" disableSticky>
                                Quản trị viên
                            </ListSubheader>
                        }
                    >
                        <SubMenuWrapper>
                            <List component="div">
                                <ListItem component="div">
                                    <Button
                                        className={
                                            currentRoute === "/admin/dashboard"
                                                ? "active"
                                                : ""
                                        }
                                        disableRipple
                                        component="a"
                                        onClick={() => {
                                            dispatch(closeSidebar());
                                            handelRoute("/admin/dashboard");
                                        }}
                                        startIcon={<BrightnessLowTwoToneIcon />}
                                    >
                                        Dashboard
                                    </Button>
                                </ListItem>
                                <ListItem component="div">
                                    <Button
                                        className={
                                            currentRoute === "/admin/users"
                                                ? "active"
                                                : ""
                                        }
                                        disableRipple
                                        component="a"
                                        onClick={() => {
                                            dispatch(closeSidebar());
                                            handelRoute("/admin/users");
                                        }}
                                        startIcon={<AccountCircleTwoToneIcon />}
                                    >
                                        Quản lý tài khoản
                                    </Button>
                                </ListItem>
                            </List>
                        </SubMenuWrapper>
                    </List>
                )}

                {permission.includes("Manager") && (
                    <List
                        component="div"
                        subheader={
                            <ListSubheader component="div" disableSticky>
                                Quản lý
                            </ListSubheader>
                        }
                    >
                        <SubMenuWrapper>
                            <List component="div">
                                <ListItem component="div">
                                    <Button
                                        className={
                                            currentRoute === "/admin/trips"
                                                ? "active"
                                                : ""
                                        }
                                        disableRipple
                                        component="a"
                                        onClick={() => {
                                            dispatch(closeSidebar());
                                            handelRoute("/admin/trips");
                                        }}
                                        startIcon={<CalendarMonthIcon />}
                                    >
                                        Lập lịch chạy
                                    </Button>
                                </ListItem>
                                <ListItem component="div">
                                    <Button
                                        className={
                                            currentRoute === "/admin/cars"
                                                ? "active"
                                                : ""
                                        }
                                        disableRipple
                                        component="a"
                                        onClick={() => {
                                            dispatch(closeSidebar());
                                            handelRoute("/admin/cars");
                                        }}
                                        startIcon={<AirportShuttleIcon />}
                                    >
                                        Quản lý xe
                                    </Button>
                                </ListItem>
                            </List>
                        </SubMenuWrapper>
                    </List>
                )}
                {permission.includes("Booking") && (
                    <List
                        component="div"
                        subheader={
                            <ListSubheader component="div" disableSticky>
                                Đặt vé
                            </ListSubheader>
                        }
                    >
                        <SubMenuWrapper>
                            <List component="div">
                                <ListItem component="div">
                                    <Button
                                        className={
                                            currentRoute === "/admin/booking"
                                                ? "active"
                                                : ""
                                        }
                                        disableRipple
                                        component="a"
                                        onClick={() => {
                                            dispatch(closeSidebar());
                                            handelRoute("/admin/booking");
                                        }}
                                        startIcon={<AddToPhotosIcon />}
                                    >
                                        Quản lý đặt vé
                                    </Button>
                                </ListItem>
                                <ListItem component="div">
                                    <Button
                                        className={
                                            currentRoute === "/admin/customer"
                                                ? "active"
                                                : ""
                                        }
                                        disableRipple
                                        component="a"
                                        onClick={() => {
                                            dispatch(closeSidebar());
                                            handelRoute("/admin/customer");
                                        }}
                                        startIcon={<PermIdentityOutlinedIcon />}
                                    >
                                        Quản lý khách hàng
                                    </Button>
                                </ListItem>
                            </List>
                        </SubMenuWrapper>
                    </List>
                )}
            </MenuWrapper>
        </>
    );
}

export default SidebarMenu;
