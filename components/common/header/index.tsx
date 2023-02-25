import * as React from "react";

import HeaderAdmin from "./SideBar";
import { Box } from "@mui/system";
import { HeaderDesktop } from "./HeaderDesktop";
// import HeaderMobi from "./HeaderMobi";

export interface IHeaderProps {}

export function Header() {
    return (
        <>
            {/* <HeaderMobi /> */}
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
