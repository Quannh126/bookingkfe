import { ILocationForm, KeyValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const locationApi = {
    getLocation() {
        return axiosClient.get(`/admin/locations`);
    },
    addLocation(data: ILocationForm) {
        return axiosClient.post(`/admin/locations`, data);
    },
    updateLocation(province_id: string, data: ILocationForm) {
        return axiosClient.put(`/admin/locations/${province_id}`, data);
    },
    removeLocation(province_id: string) {
        return axiosClient.delete(`/admin/locations/${province_id}`);
    },
    getListProvince(): Promise<Array<KeyValue>> {
        return axiosClient.get(`/admin/locations/options`);
    },
    getListDistrict(province_id: string): Promise<Array<KeyValue>> {
        return axiosClient.get(`/admin/locations/options/${province_id}`);
    },
    getListPoint(
        province_id: string,
        district_id: string
    ): Promise<Array<KeyValue>> {
        return axiosClient.get(
            `/admin/locations/options/${province_id}/${district_id}`
        );
    },
};
