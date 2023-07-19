// import { authApi } from "@/api";
import { userApi } from "@/api";
import { IUserDetail } from "@/models/Users/user-detail";

import { IUserForm } from "@/models/Users/users-form";
import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
export function useUser(options?: Partial<PublicConfiguration>) {
    //index.ts const fetcher: Fetcher<ICarDetail> = () => userApi.getAllCars()
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    };
    const {
        data: listUser,
        error,
        mutate,
    } = useSWR<[IUserDetail], Error>("/users", null, config);

    async function addUsers(data: IUserForm) {
        await userApi.addCars(data);
        mutate();
    }
    // async function getUsers() {
    //     return await userApi.getAllCars();
    // }

    async function removeUser(id: string) {
        let res = await userApi.removeCar(id);
        console.log(res);
        mutate();
    }

    async function updateUser(data: IUserDetail) {
        await userApi.updateCar(data);
        mutate();
    }
    return {
        listUser,
        error,
        addUsers,
        updateUser,
        removeUser,
        // getUsers,
        mutate,
    };
}
