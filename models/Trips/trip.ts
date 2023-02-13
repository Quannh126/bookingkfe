import ICar from "../Cars/cars";
import { IPointDetail } from "./trip-form";

export interface ITrip {
    _id: string;
    from_id: string;
    to_id: string;
    pickup_point: Array<IPointDetail>;
    dropoff_point: Array<IPointDetail>;
    car: ICar;
    departure_time: string;
    destination_time: string;
    seats_booked: Array<number>;
    fare: number;
    sell_type: string;
}
