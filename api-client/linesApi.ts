import { ILineDetail, ILineForm, KeyValue } from "@/models";
import { axiosClient } from "./axiosClient";
export const LineApi = {
    addLines(data: ILineForm) {
        return axiosClient.post("/admin/Lines", data);
    },
    getAllLines() {
        return axiosClient.get("/admin/Lines");
    },

    removeLine(id: String) {
        return axiosClient.delete(`/admin/Lines/${id}`);
    },

    updateLine(data: ILineDetail) {
        return axiosClient.put("/admin/Lines", data);
    },

    getListNameLines(): Promise<Array<KeyValue>> {
        return axiosClient.get("/admin/Lines/listNameLines");
    },
};