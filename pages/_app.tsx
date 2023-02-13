import "../styles/globals.css";
import { SWRConfig } from "swr";
import EmptyLayout from "@/components/layout/empty";
import { AppPropsWithLayout } from "../models";
import { axiosClient } from "@/api";
// import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache, PureLightTheme } from "@/utils/index";
const clientSideEmotionCache = createEmotionCache();

function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        //
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={PureLightTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SWRConfig
                    value={{
                        fetcher: (url, queryParams = "") =>
                            axiosClient.get(`${url}${queryParams}`),
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
