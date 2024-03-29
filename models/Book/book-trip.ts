import ICar from "../Cars/cars";
import { ICustomer } from "../Customer";
import { IPointDetail } from "../Trips/trip-form";
import { IBooking } from "./booking";

export type ISeatDetail = {
    seat: string;
    customer: ICustomer;
    booking: IBooking;
};
export default interface IBookingTrip {
    _id: string;
    pickup_point: Array<IPointDetail>;
    dropoff_point: Array<IPointDetail>;
    trip_id: string;
    journey_date: string;
    car: ICar;
    from_id: string;
    to_id: string;
    departure_time: string;
    destination_time: string;
    fare: string;
    sell_type: string;
    seat_booked: string;
    seat_detail: Array<ISeatDetail>;
}
