export interface SearchCar {
    from: string;
    to: string;
    departDate: string;
    // seat?: Number;
}
export default interface ICar {
    _id: string;
    name: string;
    type_car: string;
    phonenumber: string;
    driver_name: string;
    license_plate: string;
    capacity: string;
    description: string;
    comment: Array<IComment>;
    status: string;
}
export interface IComment {
    _id: string;
    user: string;
    text: string;
    star: number;
    avatar: string;
    date: Date;
}
