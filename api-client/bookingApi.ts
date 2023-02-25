import { IBookingForm, IBookingUpdateForm } from "@/models";

import { axiosClient } from "./axiosClient";
export const bookingApi = {
    addBooking(data: IBookingForm) {
        return axiosClient.post(`/admin/booking`, data);
    },
    updateBooking(data: IBookingUpdateForm) {
        return axiosClient.put(`/admin/booking`, data);
    },
    removeBooking(booking_id: string) {
        return axiosClient.delete(`/admin/booking/${booking_id}`);
    },
    getDetailTrip(tripId: string) {
        return axiosClient.get(`/admin/booking/${tripId}`);
    },
    updateSeat(seat: number, booking_id: string) {
        return axiosClient.put(`/admin/booking/change-seat`, {
            seat,
            booking_id,
        });
    },
};
