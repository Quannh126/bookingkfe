import { SearchTrip } from "@/models";
import { ITripForm } from "@/models/Trips/trip-form";
import { axiosClient } from "./axiosClient";
export const tripApi = {
    searchTrip(searchTripData: SearchTrip) {
        return axiosClient.get("/admin/trips", { params: searchTripData });
    },
    addTrip(carid: string, data: ITripForm) {
        return axiosClient.post(`/admin/trips/${carid}`, data);
    },
    updateTrip(carid: string, data: ITripForm) {
        return axiosClient.put(`/admin/trips/${carid}`, data);
    },
    removeTrip(carid: string, tripid: string) {
        return axiosClient.delete(`/admin/trips/${carid}/${tripid}`);
    },
    getDetailTrip(tripId: string) {
        return axiosClient.get(`/admin/trips/:${tripId}`);
    },
};
