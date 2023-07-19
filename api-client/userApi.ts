// import { ICarDetail, ICarForm, NameValue } from "@/models";
import { axiosClient } from "./axiosClient";
import { IUserForm } from "@/models/Users/users-form";
import { IUserDetail } from "@/models/Users/user-detail";
export const userApi = {
    addCars(data: IUserForm): Promise<any> {
        return axiosClient.post("/users", data);
    },
    getAllusers() {
        return axiosClient.get("/users");
    },
    getCarById(id: string) {
        return axiosClient.get(`/users/${id}`);
    },

    removeCar(id: String) {
        return axiosClient.delete(`/users/${id}`);
    },

    updateCar(data: IUserDetail) {
        return axiosClient.put("/users", data);
    },
};
