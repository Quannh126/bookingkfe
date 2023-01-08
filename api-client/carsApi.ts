import { ICarDetail, ICarForm, KeyValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const carsApi = {
    addCars(data: ICarForm) {
        return axiosClient.post("/admin/cars", data);
    },
    getAllCars() {
        return axiosClient.get("/admin/cars");
    },

    removeCar(id: String) {
        return axiosClient.delete(`/admin/cars/${id}`);
    },

    updateCar(data: ICarDetail) {
        return axiosClient.put("/admin/cars", data);
    },

    getListNameCars(): Promise<Array<KeyValue>> {
        return axiosClient.get("/admin/cars/listNameCars");
    },
};
