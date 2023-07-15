// import { authApi } from "@/api";

import { coachApi } from "@/api-client";
import { IBookingForm } from "@/models";
import IBookingTrip from "@/models/Book/book-trip";
// import { IBooking } from "@/models/Book/booking";
import { convertDateToString } from "@/utils";

import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
export type CreateURLPayment = {
    amount: string;
    bankCode: string;
    orderInfo: string;
    orderType: String;
    locale: string;
};
export function useCoach(
    queryParams?: string,
    isReady?: boolean,
    options?: Partial<PublicConfiguration>
) {
    //index.ts const fetcher: Fetcher<ICarDetail> = () => carsApi.getAllCars()
    if (!queryParams) {
        queryParams = `/search?route=1-2&journey_date=${convertDateToString(
            new Date()
        )}`;
    }

    const config: SWRConfiguration = {
        dedupingInterval: 3 * 60 * 1000,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        shouldRetryOnError: true,
        ...options,
    };
    const {
        data: listCoach,
        isLoading,
        error,
        mutate,
    } = useSWR<Array<IBookingTrip>, Error>(
        isReady ? `/coaches/search${queryParams}` : null,
        null,
        config
    );
    async function addBooking(data: IBookingForm): Promise<any> {
        const orderIds = await coachApi.add(data);

        await mutate();
        return orderIds;
    }
    async function createURL(data: CreateURLPayment) {
        const res = await coachApi.createPaymentURL(data);
        // window.open(res, "_blank");
        window.location.replace(res);
    }
    return {
        listCoach,
        error,
        createURL,
        isLoading,
        addBooking,
        mutate,
    };
}
