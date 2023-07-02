import { ILineDetail, ILineForm, NameValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const LineApi = {
    addLines(data: ILineForm) {
        return axiosClient.post("/Lines", data);
    },
    getAllLines() {
        return axiosClient.get("/Lines");
    },

    removeLine(id: String) {
        return axiosClient.delete(`/Lines/${id}`);
    },

    updateLine(data: ILineDetail) {
        return axiosClient.put("/Lines", data);
    },

    getListNameLines(): Promise<Array<NameValue>> {
        return axiosClient.get("/Lines/listNameLines");
    },
};
