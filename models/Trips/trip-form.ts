export interface ITripForm {
    _id?: string;
    to_id: string;
    from_id: string;
    pickup_point: Array<IPointDetail>;
    dropoff_point: Array<IPointDetail>;
    car_id: string;
    capacity: string;
    departure_time: string;
    destination_time: string;
    seats_booked: Array<number>;
    fare: number;
    sell_type: string;
}
export interface IPointDetail {
    district_id: string;
    point_id: string;
}
