import { ICustomer } from "../Customer";

export interface IBookingForm {
    trip_id: string;
    customer: ICustomer;
    // phonenumber: string;
    // name: string;
    // email: string;
    // customer_id: string;
    is_payment_online?: Boolean;
    selected_seats: string;
    fare: Number;
    note: string;
    journey_date: string;
    status_payment: string;
    pickup_point: string;
    dropoff_point: string;
}
