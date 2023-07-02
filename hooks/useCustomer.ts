// import { authApi } from "@/api";
import { customersApi } from "@/api";
import { ICustomerDetail, ICustomerForm } from "@/models";

import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
export function useCustomer(options?: Partial<PublicConfiguration>) {
    //index.ts const fetcher: Fetcher<ICustomerDetail> = () => customersApi.getAllCustomers()
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    };
    const {
        data: listCustomer,
        error,
        mutate,
    } = useSWR<[ICustomerDetail], Error>("/customer", null, config);

    async function addCustomer(data: ICustomerForm) {
        await customersApi.addCustomer(data);
        await mutate();
    }
    // async function (date: ICustomerForm) {
    //     await customersApi.addCustomers(date);
    //     mutate();
    // }

    async function removeCustomer(id: string) {
        await customersApi.removeCustomer(id);
        await mutate();
    }

    async function updateCustomer(data: ICustomerDetail) {
        await customersApi.updateCustomer(data);
        await mutate();
    }
    return {
        listCustomer,
        error,
        addCustomer,
        removeCustomer,
        updateCustomer,
        mutate,
    };
}
