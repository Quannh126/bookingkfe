// export interface IMainRoute {
//     label: string;
//     path: string;
// }
export const ROUTE_LIST = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "About",
        path: "/about",
    },
    {
        label: "Profile",
        path: "/profile",
    },
];

export const ROUTE_ADMIN = [
    {
        label: "Dashboard",
        path: "/admin",
    },

    {
        label: "Bán vé",
        path: "/admin/booking",
    },

    {
        label: "Lập lịch chạy",
        path: "/admin/trips",
    },

    {
        label: "Quản lý xe",
        path: "/admin/cars",
    },

    // {
    //     label: "Quản lý tuyến",
    //     path: "/admin/lines",
    // },

    {
        label: "Quản lý khách hàng",
        path: "/admin/customer",
    },

    {
        label: "Báo cáo",
        path: "/admin/report",
    },
];

export const ROUTE_HEADER_ADMIN = [
    {
        label: "Car",
        path: "/admin/cars",
    },
    {
        label: "Booking",
        path: "/admin/booking",
    },
    {
        label: "User",
        path: "/admin/user",
    },
    {
        label: "Logout",
        path: "/logout",
    },
];
