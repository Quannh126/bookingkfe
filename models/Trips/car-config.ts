import { NameValue } from "../common";

export interface ICarsYetToStart {
    listInfo: Array<IDriverDetail>;
    configOption: Array<NameValue>;
}

export interface IDriverDetail {
    license_plate: string;
    driver_name: string;
    capacity: string;
}
