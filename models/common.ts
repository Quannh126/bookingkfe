import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import { EmotionCache } from "@emotion/react";
export interface LayoutProps {
    children: ReactElement;
}

export type NextpageWithLayout = NextPage & {
    // eslint-disable-next-line no-unused-vars
    Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextpageWithLayout;
    emotionCache?: EmotionCache;
};

export type NameValue = {
    name: string;
    value: string;
};

export type KeyNameValue = {
    key: string;
    listOption: Array<NameValue>;
};

export interface ILocationGrouped {
    header: string;
    point: Location2[];
}
export type Location2 = {
    name: string;
    code_group: string;
};
