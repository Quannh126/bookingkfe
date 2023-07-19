import dayjs from "dayjs";
export const convertDateToString = (date: Date): string => {
    if (!date) return "";
    return dayjs(date).format("YYYY-MM-DD");
    // ("00" + date.getFullYear()).slice(-4) +
    // "-" +
    // ("00" + (date.getMonth() + 1)).slice(-2) +
    // "-" +
    // ("00" + date.getDate()).slice(-2)
};
export const convertDateToStringT = (date: Date): string => {
    if (!date) return "";
    return dayjs(date).format("DD/MM/YYYY");
    // ("00" + date.getDate()).slice(-2) +
    // "/" +
    // ("00" + (date.getMonth() + 1)).slice(-2) +
    // "/" +
    // ("00" + date.getFullYear()).slice(-4)
};
export const converFormatDate = (date: string): string => {
    if (!date) return "";
    return `${date.split("-")[2]}/${date.split("-")[1]}/${date.split("-")[0]}`;
    // return dayjs(date).format("DD/MM/YYYY");
};
