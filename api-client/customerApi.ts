import { ICustomer, ICustomerDetail, ICustomerForm, NameValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const customersApi = {
    addCustomer(data: ICustomerForm) {
        return axiosClient.post("/admin/customer", data);
    },
    getAllCustomer(): Promise<Array<ICustomer>> {
        return axiosClient.get("/admin/customer");
    },
    getCustomerById(id: string) {
        return axiosClient.get(`/admin/customer/${id}`);
    },

    removeCustomer(id: String) {
        return axiosClient.delete(`/admin/customer/${id}`);
    },

    updateCustomer(data: ICustomerDetail) {
        return axiosClient.put("/admin/customer", data);
    },

    getListNameCustomer(): Promise<Array<NameValue>> {
        return axiosClient.get("/admin/customer/options");
    },
    // getCustomersByPhoneNumber(): Promise<Array<ICustomer>> {
    //     return axiosClient.get(`/admin/customer/search`);
    // },
};
