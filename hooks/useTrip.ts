// import { authApi } from "@/api";
import { tripApi } from "@/api";

import { ITrip, ITripForm } from "@/models";

import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";

export function useTrip(
    queryParams?: String,
    options?: Partial<PublicConfiguration>
) {
    //index.ts const fetcher: Fetcher<ICarDetail> = () => carsApi.getAllCars()
    if (!queryParams) {
        queryParams = "";
    }
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        ...options,
    };
    const {
        data: listTrips,
        error,
        isLoading,
        mutate,
    } = useSWR<Array<ITrip> | [], Error>(`/trips${queryParams}`, null, config);

    async function addTrip(data: ITripForm) {
        await tripApi.addTrip(data);
        mutate();
    }

    async function removeTrip(tripId: string) {
        await tripApi.removeTrip(tripId);
        mutate();
    }

    async function updateTrip(data: ITripForm) {
        await tripApi.updateTrip(data);
        mutate();
    }

    return {
        listTrips,
        error,
        addTrip,
        removeTrip,
        updateTrip,
        mutate,
        isLoading,
    };
}
