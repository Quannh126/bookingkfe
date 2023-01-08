// import { authApi } from "@/api";
import { tripApi } from "@/api";
import { ICarDetail } from "@/models";
import { ITripForm } from "@/models/Trips/trip-form";
import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";

export function useTrip(options?: Partial<PublicConfiguration>) {
    //index.ts const fetcher: Fetcher<ICarDetail> = () => carsApi.getAllCars()
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        revalidateOnMount: false,
        ...options,
    };
    const {
        data: listCarDetail,
        error,
        mutate,
    } = useSWR<Array<ICarDetail>, Error>("/admin/trips", null, config);

    async function addTrip(carid: string, date: ITripForm) {
        await tripApi.addTrip(carid, date);
        //mutate();
    }

    async function removeTrip(carid: string, tripid: string) {
        await tripApi.removeTrip(carid, tripid);
        // console.log(res);
        //mutate();
    }

    async function updateTrip(carid: string, data: ITripForm) {
        await tripApi.updateTrip(carid, data);
        // mutate();
    }

    return {
        listCarDetail,
        error,
        addTrip,
        removeTrip,
        updateTrip,
        mutate,
    };
}