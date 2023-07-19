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
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import { wrapper } from "@/redux/store";
import createEmotionCache from "@/utils/createEmotionCache";
import Head from "next/head";
import { useEffect } from "react";
// import { AppProps } from "next/app";

const clientSideEmotionCache = createEmotionCache();
function App(props: AppPropsWithLayout) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
        ...rest
    } = props;
    const Layout = Component.Layout ?? EmptyLayout;

    const { store } = wrapper.useWrappedStore(rest);
    Router.events.on("routeChangeStart", nProgress.start);
    Router.events.on("routeChangeError", nProgress.done);
    Router.events.on("routeChangeComplete", nProgress.done);
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles?.parentElement?.removeChild(jssStyles);
        }
    }, []);
    return (
        <CacheProvider value={emotionCache!}>
            <Provider store={store}>
                <Head>
                    <title>BYGroup Đặt vé xe</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                </Head>
                <ThemeProvider>
                    <SWRConfig
                        value={{
                            fetcher: (url, queryParams = "") =>
                                axiosClient.get(`${url}${queryParams}`),
                            shouldRetryOnError: false,
                        }}
                    >
                        <>
                            <CssBaseline />
                            <ToastContainer
                                newestOnTop
                                position="bottom-right"
                            />
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </>
                    </SWRConfig>
                </ThemeProvider>
                {/* </LocalizationProvider> */}
            </Provider>
        </CacheProvider>
    );
}
export default App;
