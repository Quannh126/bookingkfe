import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { EmotionCache } from "@emotion/react";
export interface LayoutProps {
    children: ReactNode;
}

export type NextpageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextpageWithLayout;
    emotionCache?: EmotionCache;
};
