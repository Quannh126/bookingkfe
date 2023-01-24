import ICar from "../Cars/cars";

export interface ITripForm {
    pickup_point: Array<IPointDetail>;
    dropoff_point: Array<IPointDetail>;
    car: ICar;
    to_id: string;
    from_id: string;
    to_name: string;
    from_name: string;
    departure_time: string;
    destination_time: string;
    duration: number;
    seats_booked: Array<number>;
    fare: number;
    sell_type: string;
}
export interface IPointDetail {
    // province_id: number;
    district_id: string;
    point_id: string;
    // name: string;
    // address: string;
}
