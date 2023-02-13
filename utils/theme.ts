import { Roboto } from "@next/font/google";

export const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["Helvetica", "Arial", "sans-serif"],
});

// // Create a theme instance.
// export const theme = createTheme({
//     typography: {
//         fontFamily: "Roboto, sans-serif",
//     },
//     palette: {
//         primary: {
//             main: "#556cd6",
//         },
//         secondary: {
//             main: "#19857b",
//         },
//         error: {
//             main: red.A400,
//         },
//     },
//     components: {
//         MuiTableCell: {
//             styleOverrides: {
//                 root: {
//                     borderLeft: "1px solid rgba(224, 224, 224, 1)",
//                 },
//             },
//         },
//         MuiDialog: {
//             defaultProps: {
//                 maxWidth: "md",
//             },
//             styleOverrides: {
//                 paperWidthMd: {
//                     maxWidth: "860px",
//                     "@media (min-width: 860px)": {
//                         maxWidth: "860px",
//                     },
//                 },
//             },
//         },
//         MuiContainer: {
//             defaultProps: {
//                 maxWidth: "md",
//             },
//             styleOverrides: {
//                 maxWidthSm: {
//                     maxWidth: "680px",
//                     "@media (min-width: 600px)": {
//                         maxWidth: "680px",
//                     },
//                 },
//                 maxWidthMd: {
//                     maxWidth: "860px",
//                     "@media (min-width: 900px)": {
//                         maxWidth: "980px",
//                     },
//                 },
//             },
//         },
//         MuiLink: {
//             styleOverrides: {
//                 root: {
//                     color: "black",
//                     "&:hover, &.active": {
//                         color: "#FF6464",
//                     },
//                 },
//             },
//             defaultProps: {
//                 underline: "none",
//             },
//         },
//         MuiTypography: {
//             styleOverrides: {
//                 root: {
//                     "&.lineThrough": {
//                         textDecorationLine: "line-through",
//                     },
//                 },
//             },
//         },
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     "&.active": {
//                         backgroundColor: "rgba(255, 255, 255, 0.06)",
//                         color: "rgb(255, 255, 255)",
//                     },
//                 },
//             },
//         },
//     },
// });
