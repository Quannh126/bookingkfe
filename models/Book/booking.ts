import { ICustomer } from "../Customer";

export interface IBooking {
    _id: string;
    trip_id: string;
    customer: ICustomer;
    selected_seats: string;
    fare: Number;
    note: string;
    status_payment: string;
    pickup_point: string;
    dropoff_point: string;
}
