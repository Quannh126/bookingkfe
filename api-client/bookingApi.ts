import { IBookingForm, IBookingUpdateForm } from "@/models";

import { axiosClient } from "./axiosClient";
export const bookingApi = {
    addBooking(data: IBookingForm) {
        return axiosClient.post(`/booking`, data);
    },
    updateBooking(data: IBookingUpdateForm) {
        return axiosClient.put(`/booking`, data);
    },
    removeBooking(trip_id: string, list_seat: string) {
        return axiosClient.put(`/booking/remove`, {
            trip_id,
            list_seat: list_seat,
        });
    },
    getDetailTrip(tripId: string) {
        return axiosClient.get(`/booking/${tripId}`);
    },
    updateSeat(seat: number, booking_id: string) {
        return axiosClient.put(`/booking/change-seat`, {
            seat,
            booking_id,
        });
    },
};
