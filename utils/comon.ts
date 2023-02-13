export const convertDateToString = (date: Date): string => {
    if (!date) return "";
    return (
        ("00" + date.getFullYear()).slice(-4) +
        "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2)
    );
};
export const convertDateToStringT = (date: Date): string => {
    if (!date) return "";
    return (
        ("00" + date.getDate()).slice(-2) +
        "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        ("00" + date.getFullYear()).slice(-4)
    );
};
export const converFormatDate = (date: string): string => {
    if (!date) return "";
    return `${date.split("-")[2]}/${date.split("-")[1]}/${date.split("-")[0]}`;
};
// const converMoneyToWords = (): String => {
//     let t = [
//         "không",
//         "một",
//         "hai",
//         "ba",
//         "bốn",
//         "năm",
//         "sáu",
//         "bảy",
//         "tám",
//         "chín",
//     ];
//     return "";
// };
