import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import { EmotionCache } from "@emotion/react";
export interface LayoutProps {
    children: ReactElement;
}

export type NextpageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextpageWithLayout;
    emotionCache?: EmotionCache;
};
