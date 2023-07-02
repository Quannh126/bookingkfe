import {
    ILocation,
    ILocationForm,
    ILocationGrouped,
    NameValue,
} from "@/models";
import { axiosClient } from "./axiosClient";
export const locationApi = {
    getLocation() {
        return axiosClient.get(`/locations`);
    },
    addLocation(data: ILocationForm) {
        return axiosClient.post(`/locations`, data);
    },
    updateLocation(province_id: string, data: ILocationForm) {
        return axiosClient.put(`/locations/${province_id}`, data);
    },
    removeLocation(province_id: string) {
        return axiosClient.delete(`/locations/${province_id}`);
    },
    getListProvince(): Promise<Array<NameValue>> {
        return axiosClient.get(`/locations/options`);
    },
    getListDistrict(province_id: string): Promise<Array<NameValue> | []> {
        return axiosClient.get(`/locations/options/${province_id}`);
    },
    getListPoint(
        province_id: string,
        district_id: string
    ): Promise<Array<NameValue>> {
        return axiosClient.get(
            `/locations/options/${province_id}/${district_id}`
        );
    },
    getDetailProvince(province_id: string): Promise<ILocation> {
        return axiosClient.get(`/locations/detail/${province_id}`);
    },
    getLocationGrouped(): Promise<Array<ILocationGrouped>> {
        return axiosClient.get(`locations/group-options`);
    },
};
