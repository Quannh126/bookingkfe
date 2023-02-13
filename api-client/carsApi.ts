import { ICarDetail, ICarForm, NameValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const carsApi = {
    addCars(data: ICarForm) {
        return axiosClient.post("/admin/cars", data);
    },
    getAllCars() {
        return axiosClient.get("/admin/cars");
    },
    getCarById(id: string) {
        return axiosClient.get(`/admin/cars/${id}`);
    },

    removeCar(id: String) {
        return axiosClient.delete(`/admin/cars/${id}`);
    },

    updateCar(data: ICarDetail) {
        return axiosClient.put("/admin/cars", data);
    },

    getListNameCars(): Promise<Array<NameValue>> {
        return axiosClient.get("/admin/cars/listNameCars");
    },
};
