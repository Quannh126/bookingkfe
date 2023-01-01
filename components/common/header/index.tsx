import * as React from "react";

import HeaderAdmin from "./SideBar";
import { Box } from "@mui/system";
import HeaderMobi from "./HeaderMobi";
import HeaderDesktop from "./HeaderDesktop";

export interface IHeaderProps {}

export function Header() {
    return (
        <>
            <HeaderMobi />
            <HeaderDesktop />
        </>
    );
}
export function HeaderAdminPage() {
    return (
        <Box>
            {/* <Header/> */}
            <HeaderAdmin />
        </Box>
    );
}
