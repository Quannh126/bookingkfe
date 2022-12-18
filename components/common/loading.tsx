import * as React from "react";
import Image from "next/image";
export interface ILoading {
    screen: string;
}

export default function LoadingPage({ screen }: ILoading) {
    if (screen == "login") {
        return (
            <>
                <Image
                    src="/public/img/spinner.gif"
                    alt=""
                    className="spinner"
                />
            </>
        );
    }
    return (
        <>
            <Image src="/public/img/spinner.gif" alt="" className="spinner" />
        </>
    );
}
