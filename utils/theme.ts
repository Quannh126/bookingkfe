import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
export const theme = createTheme({
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
    },
    // typography: {
    //     fontFamily: roboto.style.fontFamily,
    // },
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: "md",
            },
            styleOverrides: {
                maxWidthSm: {
                    maxWidth: "680px",
                    "@media (min-width: 600px)": {
                        maxWidth: "680px",
                    },
                },
                maxWidthMd: {
                    maxWidth: "860px",
                    "@media (min-width: 900px)": {
                        maxWidth: "980px",
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "black",
                    "&:hover, &.active": {
                        color: "#FF6464",
                    },
                },
            },
            defaultProps: {
                underline: "none",
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    "&.lineThrough": {
                        textDecorationLine: "line-through",
                    },
                },
            },
        },
    },
});
