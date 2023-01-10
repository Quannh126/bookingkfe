// import { authApi } from "@/api";
import { LineApi } from "@/api";
import { ILineDetail, ILineForm } from "@/models";

import useSWR from "swr";
import { PublicConfiguration, SWRConfiguration } from "swr/_internal";
export function useLines(options?: Partial<PublicConfiguration>) {
    //index.ts const fetcher: Fetcher<ILineDetail> = () => LineApi.getAllLines()
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    };
    const {
        data: listLine,
        error,
        mutate,
    } = useSWR<[ILineDetail], Error>("/admin/lines", config);

    async function addLines(date: ILineForm) {
        await LineApi.addLines(date);
        await mutate();
    }
    // async function (date: ILineForm) {
    //     await LineApi.addLines(date);
    //     mutate();
    // }

    async function removeLine(id: string) {
        await LineApi.removeLine(id);
        await mutate();
    }

    async function updateLine(data: ILineDetail) {
        await LineApi.updateLine(data);
        await mutate();
    }
    return {
        listLine,
        error,
        addLines,
        removeLine,
        updateLine,
        mutate,
    };
}
