import { IBookingForm } from "@/models";
import { axiosClient } from "./axiosClient";
import { CreateURLPayment } from "@/hooks";
// import { DataCheckSum } from "@/pages/return_vnpay";
export const coachApi = {
    add(data: IBookingForm) {
        return axiosClient.post(`/coaches`, data);
    },
    createPaymentURL(data: CreateURLPayment): Promise<string> {
        return axiosClient.post(`/payment/create-payment-url`, data);
    },
    checkSum(data: String): Promise<any> {
        return axiosClient.get(`/payment/check-sum?${data}`);
    },
    getSearch(query: string): Promise<any> {
        return axiosClient.get(`/coaches/search${query}`);
    },
    // getDetailTrip(tripId: string) {
    //     return axiosClient.get(`/coach/${tripId}`);
    // },
};
