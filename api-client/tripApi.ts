import { SearchTrip } from "@/models";
import { axiosClient } from "./axiosClient";
export const tripApi = {
    searchTrip(searchTripData: SearchTrip) {
        return axiosClient.get("/cars", { params: searchTripData });
    },

    getDetailTrip(tripId: string) {
        return axiosClient.get(`/trips/:${tripId}`);
    },
};
