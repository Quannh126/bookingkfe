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
    } = useSWR<[ICarDetail], Error>("/cars", null, config);

    async function addCars(date: ICarForm): Promise<any> {
        const result = await carsApi.addCars(date);
        await mutate();
        return result;
    }
    // async function (date: ICarForm) {
    //     await carsApi.addCars(date);
    //     mutate();
    // }

    async function removeCar(id: string) {
        await carsApi.removeCar(id);
        await mutate();
    }

    async function updateCar(data: ICarDetail) {
        await carsApi.updateCar(data);
        await mutate();
    }
    return {
        listCar,
        error,
        addCars,
        removeCar,
        updateCar,
        mutate,
    };
}
