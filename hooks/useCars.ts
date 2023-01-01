// import { authApi } from "@/api";
import { carsApi } from "@/api";
import { ICarDetail, ICarForm } from "@/models";
import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
export function useCar(options?: Partial<PublicConfiguration>) {
    //index.ts const fetcher: Fetcher<ICarDetail> = () => carsApi.getAllCars()
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    };
    const {
        data: listCar,
        error,
        mutate,
    } = useSWR<[ICarDetail], Error>("/admin/cars", null, config);

    async function addCars(date: ICarForm) {
        await carsApi.addCars(date);
        mutate();
    }
    // async function (date: ICarForm) {
    //     await carsApi.addCars(date);
    //     mutate();
    // }
    async function getCars() {
        return await carsApi.getAllCars();
    }

    async function removeCar(id: string) {
        let res = await carsApi.removeCar(id);
        console.log(res);
        mutate();
    }

    async function updateCar(data: ICarDetail) {
        await carsApi.updateCar(data);
        mutate();
    }
    return {
        listCar,
        error,
        addCars,
        getCars,
        removeCar,
        updateCar,
        mutate,
    };
}
