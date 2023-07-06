// import { authApi } from "@/api";
import { bookingApi } from "@/api";

import { IBookingForm, IBookingUpdateForm } from "@/models";
import IBookingTrip from "@/models/Book/book-trip";
// import { IBooking } from "@/models/Book/booking";
import { convertDateToString } from "@/utils";

import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";

export function useBooking(
    queryParams: string,
    options?: Partial<PublicConfiguration>
) {
    //index.ts const fetcher: Fetcher<ICarDetail> = () => carsApi.getAllCars()

    if (!queryParams) {
        queryParams = `/search?route=1-2&journey_date=${convertDateToString(
            new Date()
        )}`;
    }
    const config: SWRConfiguration = {
        dedupingInterval: 20 * 1000,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        ...options,
    };
    const {
        data: listBooking,
        isLoading,
        error,
        mutate,
    } = useSWR<Array<IBookingTrip>, Error>(
        `/booking${queryParams}`,
        null,
        config
    );

    async function addBooking(data: IBookingForm) {
        await bookingApi.addBooking(data);
        await mutate();
    }

    async function removeBooking(trip_id: string, list_seat: string) {
        await bookingApi.removeBooking(trip_id, list_seat);
        mutate();
    }

    async function updateBooking(data: IBookingUpdateForm) {
        await bookingApi.updateBooking(data);
        mutate();
    }
    async function updateSeat(seat: number, booking_id: string) {
        await bookingApi.updateSeat(seat, booking_id);
        mutate();
    }

    return {
        listBooking,
        error,
        isLoading,
        updateSeat,
        addBooking,
        removeBooking,
        updateBooking,
        mutate,
    };
}
