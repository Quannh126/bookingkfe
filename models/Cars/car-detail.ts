export interface ICarDetail {
    _id: string;
    name: string;
    type_car: string;
    attachment?: Array<File>;
    license_plate: string;
    imgPath: string;
    capacity: string;
    description: string;
    driver_name: string;
    phonenumber: string;
    // pathImg: string;
    status: string;
}
