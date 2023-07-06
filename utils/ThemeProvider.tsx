import { useState, createContext, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StyledEngineProvider } from "@mui/material/styles";
import { LayoutProps } from "@/models";

// eslint-disable-next-line no-unused-vars
export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProviderWrapper = (props: LayoutProps) => {
    const [themeName, _setThemeName] = useState("PureLightTheme");

    useEffect(() => {
        const curThemeName =
            window.localStorage.getItem("appTheme") || "PureLightTheme";
        _setThemeName(curThemeName);
    }, []);

    const theme = themeCreator(themeName);
    const setThemeName = (themeName: string): void => {
        window.localStorage.setItem("appTheme", themeName);
        _setThemeName(themeName);
    };

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={setThemeName}>
                <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    );
};

export default ThemeProviderWrapper;
