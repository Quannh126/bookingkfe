import { ICarDetail, ICarForm, NameValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const carsApi = {
    addCars(data: ICarForm): Promise<any> {
        return axiosClient.post("/cars", data);
    },
    getAllCars() {
        return axiosClient.get("/cars");
    },
    getCarById(id: string) {
        return axiosClient.get(`/cars/${id}`);
    },

    removeCar(id: String) {
        return axiosClient.delete(`/cars/${id}`);
    },

    updateCar(data: ICarDetail) {
        return axiosClient.put("/cars", data);
    },

    getListNameCars(): Promise<Array<NameValue>> {
        return axiosClient.get("/cars/listNameCars");
    },
};
