// TODO: why does the dev build not pick this up automatically?
// https://github.com/microsoft/TypeScript-React-Starter/issues/12#issuecomment-369113072

{
    /* <reference path='./index.d.ts'/> */
}

import { NameValue } from "@/models";
import IBookingTrip from "@/models/Book/book-trip";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

type ITicket = {
    seatBookedSeleted: Array<number>;
    tripDetail: IBookingTrip;
    listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
};

type State = {
    checked: boolean;
};

export class ComponentToPrint extends React.PureComponent<ITicket, State> {
    constructor(props: ITicket) {
        super(props);

        this.state = { checked: false };
    }

    public componentDidMount() {}

    public render() {
        const { seatBookedSeleted, tripDetail, listDropoffAndPickUp } =
            this.props;
        function getNameLocatioin(isDropoff: boolean, value: any): string {
            if (isDropoff) {
                return listDropoffAndPickUp!.dropoff
                    .find((item: any) => item.value === `${value}`)!
                    .name.split("-")[1];
            } else {
                return listDropoffAndPickUp!.pickup
                    .find((item: any) => item.value === `${value}`)!
                    .name.split("-")[1];
            }
        }
        return (
            <>
                <Typography variant="h3">Công ty Bảo Yến</Typography>
                <Typography>{`Vé xe khách chuyến ${
                    tripDetail?.from_id == "1"
                        ? "Hà nội đến Tuyên Quang"
                        : " Tuyên Quang đến Hà Nội"
                }`}</Typography>
                <Typography>
                    Điểm đón khách{" "}
                    {getNameLocatioin(
                        false,
                        tripDetail!.seat_detail.find(
                            (seat) =>
                                seat.seat === `${seatBookedSeleted[0]! + 1}`
                        )?.booking.pickup_point
                    )}
                </Typography>

                <Typography variant="body2">
                    Điểm trả khách{" "}
                    {getNameLocatioin(
                        true,
                        tripDetail!.seat_detail.find(
                            (seat) =>
                                seat.seat === `${seatBookedSeleted[0]! + 1}`
                        )?.booking.dropoff_point
                    )}
                </Typography>
                <Box>{`${seatBookedSeleted?.toString()}`}</Box>
            </>
        );
    }
}

export const FunctionalComponentToPrint = React.forwardRef<
    ComponentToPrint | null,
    ITicket
>((props, ref) => {
    // eslint-disable-line max-len

    return (
        <ComponentToPrint
            ref={ref}
            seatBookedSeleted={props.seatBookedSeleted}
            tripDetail={props.tripDetail}
            listDropoffAndPickUp={props.listDropoffAndPickUp}
        />
    );
});
