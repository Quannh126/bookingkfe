import "../styles/globals.css";
import { SWRConfig } from "swr";
import EmptyLayout from "@/components/layout/empty";
import { AppPropsWithLayout } from "../models";
import axiosClient from "@/api/axiosClient";
// import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { theme, createEmotionCache } from "@/utils/index";
const clientSideEmotionCache = createEmotionCache();

function App({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SWRConfig
                    value={{
                        fetcher: (url) => axiosClient.get(url),
                        shouldRetryOnError: false,
                    }}
                >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    );
}
export default App;
