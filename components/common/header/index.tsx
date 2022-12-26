import * as React from "react";
import HeaderDesktop from "./headerDesktop";
import HeaderMobi from "./headerMobi";
import HeaderAdmin from "./headerAmin";
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
        <>
            <HeaderAdmin />
        </>
    );
}
