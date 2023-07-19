import { NameValue } from "@/models";
import { ITripForm } from "@/models/Trips/trip-form";
import { axiosClient } from "./axiosClient";
export const tripApi = {
    addTrip(data: ITripForm) {
        return axiosClient.post(`/trips`, data);
    },
    updateTrip(data: ITripForm) {
        return axiosClient.put(`/trips`, data);
    },
    removeTrip(tripid: string) {
        return axiosClient.delete(`/trips/${tripid}`);
    },
    getDetailTrip(tripId: string) {
        return axiosClient.get(`/trips/${tripId}`);
    },
    getOptionDropoffAndPickup(
        trip_id: string
    ): Promise<{ dropoff: Array<NameValue>; pickup: Array<NameValue> }> {
        return axiosClient.get(`/trips/option/${trip_id}`);
    },
};
