import { NameValue } from "@/models";
import React from "react";
import { Box } from "@mui/system";
import { Divider, Grid, Typography } from "@mui/material";
// import { convertDateToStringT } from "@/utils";
import SeatSelection from "./seatSelection";
import IBookingTrip from "@/models/Book/book-trip";
import { converFormatDate } from "@/utils";

export interface ITripDetailProps {
    journeyDate: string;
    tripDetail: IBookingTrip;
    listProvince: Array<NameValue> | [];
    // eslint-disable-next-line no-unused-vars
    handleAddClick: (selectedSeats: Array<number>) => void;
    selectedSeats: Array<number>;
    setSelectedSeats: React.Dispatch<React.SetStateAction<Array<number>>>;
    selectedSeatsBooked: Array<number>;
    setSelectedSeatsBooked: React.Dispatch<React.SetStateAction<Array<number>>>;
    setShowListTrip: React.Dispatch<React.SetStateAction<boolean>>;
    listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
}
function getName(list: Array<NameValue>, value: String): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === value) {
            return list[i].name;
        }
    }
    return "";
}
export default function TripDetail({
    tripDetail,
    journeyDate,
    listProvince,
    handleAddClick,
    selectedSeats,
    setSelectedSeats,
    setShowListTrip,
    listDropoffAndPickUp,
    selectedSeatsBooked,
    setSelectedSeatsBooked,
}: ITripDetailProps) {
    // const [selectedSeats, setSelectedSeats] = useState([] as Array<number>);

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={3} xl={2}>
                    <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                        Thông tin chi tiết
                    </Typography>
                    <Divider />
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 2 }}>
                        <Typography variant="h4">
                            {getName(listProvince, tripDetail.from_id!) +
                                " - " +
                                getName(listProvince, tripDetail.to_id!)}
                        </Typography>
                    </Box>
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 1 }}>
                        <Typography variant="subtitle2">
                            Khởi hành lúc:
                        </Typography>
                        <Typography variant="h4" ml={1}>
                            {tripDetail.departure_time}
                        </Typography>
                    </Box>
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 1 }}>
                        <Typography variant="subtitle2">
                            Đến nơi lúc:
                        </Typography>
                        <Typography variant="h4" ml={1}>
                            {tripDetail.destination_time}
                        </Typography>
                    </Box>
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 1 }}>
                        <Typography variant="subtitle2">
                            Ngày khởi hành:
                        </Typography>
                        <Typography variant="h4" ml={1}>
                            {converFormatDate(journeyDate)}
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        sx={{ alignItems: "baseline", mt: 1, mb: 2 }}
                    >
                        <Typography variant="subtitle2">Giá vé:</Typography>
                        <Typography variant="h4" ml={1}>
                            {`${tripDetail.fare.toLocaleString()} VNĐ `}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 2 }}>
                        <Typography variant="h4">
                            {tripDetail.car.name}
                        </Typography>
                    </Box>
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 1 }}>
                        <Typography variant="subtitle2">Biển số xe:</Typography>
                        <Typography variant="h4" ml={1}>
                            {tripDetail.car.license_plate}
                        </Typography>
                    </Box>
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 2 }}>
                        <Typography variant="subtitle2">Tên tài xế:</Typography>
                        <Typography variant="h4" ml={1}>
                            {tripDetail.car.driver_name}
                        </Typography>
                    </Box>
                    <Box display="flex" sx={{ alignItems: "baseline", mt: 1 }}>
                        <Typography variant="subtitle2">
                            Số điện thoại:
                        </Typography>
                        <Typography variant="h4" ml={1}>
                            {tripDetail.car.phonenumber}
                        </Typography>
                    </Box>
                    <Box>{selectedSeats.toString()}</Box>
                    <Box>{selectedSeatsBooked.toString()}</Box>
                </Grid>
                {/* <Grid item xs={12} lg={5} xl={5}></Grid> */}
                <Grid item xs={12} lg={9} xl={10}>
                    <SeatSelection
                        tripDetail={tripDetail}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        handleAddClick={handleAddClick}
                        setShowListTrip={setShowListTrip}
                        listDropoffAndPickUp={listDropoffAndPickUp}
                        selectedSeatsBooked={selectedSeatsBooked}
                        setSelectedSeatsBooked={setSelectedSeatsBooked}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
