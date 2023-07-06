import "../styles/globals.css";
import { SWRConfig } from "swr";
import EmptyLayout from "@/components/layout/empty";
import { AppPropsWithLayout } from "../models";
import { axiosClient } from "@/api";
// import { AppProps } from "next/app";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import { Provider } from "react-redux";
import ThemeProvider from "@/utils/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "@/utils/index";

import { wrapper } from "@/redux/store";
const clientSideEmotionCache = createEmotionCache();
function App({ Component, pageProps, ...rest }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    const { store } = wrapper.useWrappedStore(rest);
    Router.events.on("routeChangeStart", nProgress.start);
    Router.events.on("routeChangeError", nProgress.done);
    Router.events.on("routeChangeComplete", nProgress.done);
    return (
        <Provider store={store}>
            <CacheProvider value={clientSideEmotionCache}>
                <SWRConfig
                    value={{
                        fetcher: (url, queryParams = "") =>
                            axiosClient.get(`${url}${queryParams}`),
                        shouldRetryOnError: false,
                    }}
                >
                    <ThemeProvider>
                        <>
                            <CssBaseline />
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </>
                    </ThemeProvider>
                </SWRConfig>
                {/* </LocalizationProvider> */}
            </CacheProvider>
        </Provider>
    );
}
export default App;
