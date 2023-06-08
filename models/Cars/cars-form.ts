export interface ICarForm {
    name: string;
    type_car: string;

    attachment?: Array<File>;
    license_plate: string;
    capacity: string;
    description: string;
    driver_name: string;
    phonenumber: string;
    // driver_id: string;
    // driver2_id: string;
}
