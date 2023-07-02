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
        path: "/admin/dashboard",
        title: "Dashboard",
    },

    {
        label: "Bán vé",
        path: "/admin/booking",
        title: "Ticketing",
    },

    {
        label: "Lập lịch chạy",
        path: "/admin/trips",
        title: "Trip Management",
    },

    {
        label: "Quản lý xe",
        path: "/admin/cars",
        title: "Car Management",
    },

    {
        label: "Quản lý khách hàng",
        path: "/admin/customer",
        title: "Customer Management",
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

export const ROUTE_MANAGER = [
    {
        label: "Dashboard",
        path: "/admin/dashboard",
        title: "Dashboard",
    },
    {
        label: "Quản lý xe",
        path: "/admin/cars",
        title: "Car Management",
    },
    {
        label: "Lập lịch chạy",
        path: "/admin/trips",
        title: "Trip Management",
    },
];

export const ROUTE_TICKETING = [
    {
        label: "Bán vé",
        path: "/admin/booking",
        title: "Ticketing",
    },
    {
        label: "Quản lý khách hàng",
        path: "/admin/customer",
        title: "Customer Management",
    },
];
