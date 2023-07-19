// import { authApi } from "@/api";

import { ILocation } from "@/models";
import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
export function useLocation(options?: Partial<PublicConfiguration>) {
    //index.ts const fetcher: Fetcher<ICarDetail> = () => carsApi.getAllCars()
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: false,
        ...options,
    };
    const {
        data: location,
        error,
        mutate,
    } = useSWR<[ILocation], Error>(
        "/locations/detail/${province_id}",
        null,
        config
    );

    return {
        location,
        error,
        mutate,
    };
}
