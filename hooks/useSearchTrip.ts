import { tripApi } from "@/api";

// import { SearchCar } from "@/models";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
export function useSearchTrip(options?: Partial<PublicConfiguration>) {
    const {
        data: listCar,
        error,
        mutate,
    } = useSWR("/cars", {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    });

    async function getTrip(tripId: string) {
        await tripApi.getDetailTrip(tripId);
        await mutate();
    }

    return {
        listCar,
        error,
        getTrip,
    };
}
