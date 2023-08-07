import { ICustomer } from "../Customer";

export interface IBookingUpdateForm {
    list_id: string;
    trip_id: string;
    customer: ICustomer;
    selected_seats: string;
    fare: Number;
    note: string;
    journey_date: string;
    status_payment: string;
    pickup_point: string;
    dropoff_point: string;
    ticket_code: string;
}
