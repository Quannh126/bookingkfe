import * as React from "react";
import useSWR from "swr";
export interface ICarDetialProps {
    carId: string;
}

export function CarDetil({ carId }: ICarDetialProps) {
    const { data } = useSWR(`/cars/${carId}`, {
        revalidateOnFocus: false,
    });
    return <div>Name: {data?.name}</div>;
}
