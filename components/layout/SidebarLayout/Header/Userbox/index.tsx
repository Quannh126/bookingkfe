import { useRef, useState } from "react";

// import NextLink from "next/link";

import {
    Avatar,
    Box,
    Button,
    Divider,
    Hidden,
    lighten,
    // List,
    // ListItem,
    // ListItemText,
    Popover,
    Typography,
} from "@mui/material";
import { useAuth } from "@/hooks";
// import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
// import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
// import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import { logout } from "@/redux/selectedAuth";
import { useDispatch } from "react-redux";
const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
    const { logout: logoutHook, profile: user } = useAuth({
        revalidateOnMount: false,
    });
    const dispatch = useDispatch();
    const handleLogout = (): void => {
        logoutHook();
        dispatch(logout());
    };
    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar
                    variant="rounded"
                    alt={user!.username}
                    src={user!.avatar}
                />
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">
                            {user!.fullname}
                        </UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user!.role}
                        </UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
                </Hidden>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuUserBox sx={{ minWidth: 210 }} display="flex">
                    <Avatar
                        variant="rounded"
                        alt={user!.username}
                        src={user!.avatar}
                    />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">
                            {user!.username}
                        </UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {/* {user.jobtitle} */}
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider sx={{ mb: 0 }} />
                {/* <List sx={{ p: 1 }} component="nav">
                    <NextLink href="/management/profile" passHref>
                        <ListItem button>
                            <AccountBoxTwoToneIcon fontSize="small" />
                            <ListItemText primary="My Profile" />
                        </ListItem>
                    </NextLink>
                    <NextLink href="/applications/messenger" passHref>
                        <ListItem button>
                            <InboxTwoToneIcon fontSize="small" />
                            <ListItemText primary="Messenger" />
                        </ListItem>
                    </NextLink>
                    <NextLink href="/management/profile/settings" passHref>
                        <ListItem button>
                            <AccountTreeTwoToneIcon fontSize="small" />
                            <ListItemText primary="Account Settings" />
                        </ListItem>
                    </NextLink>
                </List> */}
                <Divider />
                <Box sx={{ m: 1 }}>
                    <Button color="primary" fullWidth onClick={handleLogout}>
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default HeaderUserbox;
