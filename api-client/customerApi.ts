import { ICustomer, ICustomerDetail, ICustomerForm, NameValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const customersApi = {
    addCustomer(data: ICustomerForm) {
        return axiosClient.post("/customer", data);
    },
    getAllCustomer(): Promise<Array<ICustomer>> {
        return axiosClient.get("/customer");
    },
    getCustomerById(id: string) {
        return axiosClient.get(`/customer/${id}`);
    },

    removeCustomer(id: String) {
        return axiosClient.delete(`/customer/${id}`);
    },

    updateCustomer(data: ICustomerDetail) {
        return axiosClient.put("/customer", data);
    },

    getListNameCustomer(): Promise<Array<NameValue>> {
        return axiosClient.get("/customer/options");
    },
    // getCustomersByPhoneNumber(): Promise<Array<ICustomer>> {
    //     return axiosClient.get(`/customer/search`);
    // },
};
