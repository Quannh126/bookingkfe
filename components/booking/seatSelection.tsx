import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    Grid,
    // IconButton,
    Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {} from "@mui/material";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IBookingTrip from "@/models/Book/book-trip";
import { NameValue } from "@/models";
import { PureLightTheme } from "@/utils";
// import { ICustomer } from "@/models";
export interface ISeatSelectionProps {
    selectedSeats: Array<number>;
    selectedSeatsBooked: Array<number>;
    setSelectedSeatsBooked: React.Dispatch<React.SetStateAction<Array<number>>>;
    setSelectedSeats: React.Dispatch<React.SetStateAction<Array<number>>>;
    setShowListTrip: React.Dispatch<React.SetStateAction<boolean>>;
    tripDetail: IBookingTrip;
    // eslint-disable-next-line no-unused-vars
    handleAddClick: (selectedSeats: Array<number>) => void;
    listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
}

export default function SeatSelection({
    tripDetail,
    listDropoffAndPickUp,
    selectedSeats,
    setSelectedSeats,
    handleAddClick,
    setShowListTrip,
    selectedSeatsBooked,
    setSelectedSeatsBooked,
}: ISeatSelectionProps) {
    const capacity = Number(tripDetail!.car.capacity);
    const [seatDetail, setSeatDetail] = useState(tripDetail);
    const [errorText, setErrorText] = useState("");
    const [showError, setShowError] = useState(false);
    function handleClickToSeat(seatNumber: number) {
        if (selectedSeats.includes(seatNumber)) {
            console.log(selectedSeats + "---" + seatNumber);
            const listSelected = selectedSeats.filter(
                (seat: number) => seat !== seatNumber
            );
            setSelectedSeats(listSelected);
            setSelectedSeatsBooked([]);
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
            setSelectedSeatsBooked([]);
        }
    }
    function handleClickToSeatBooked(seatNumber: number) {
        const listSeatSameCustomer: Array<number> = [] as Array<number>;
        const customer_id = tripDetail.seat_detail.find(
            (seat) => seat.seat === `${seatNumber}`
        )?.customer._id;
        tripDetail.seat_detail.forEach((seat) => {
            if (seat.customer._id === customer_id) {
                listSeatSameCustomer.push(Number(seat.seat));
            }
        });

        if (selectedSeatsBooked.includes(seatNumber)) {
            // console.log(selectedSeatsBooked + "---" + seatNumber);
            const listSelected = selectedSeats.filter(
                (seat: number) => seat !== seatNumber
            );
            setSelectedSeatsBooked(listSelected);
            setSelectedSeats([]);
        } else {
            setSelectedSeatsBooked(listSeatSameCustomer);
            setSelectedSeats([]);
        }
    }
    function getNameLocatioin(isDropoff: boolean, value: any): string {
        if (isDropoff) {
            return listDropoffAndPickUp.dropoff
                .find((item) => item.value === `${value}`)!
                .name.split("-")[1];
        } else {
            return listDropoffAndPickUp.pickup
                .find((item) => item.value === `${value}`)!
                .name.split("-")[1];
        }
    }

    useEffect(() => {
        setSeatDetail(tripDetail);
    }, [tripDetail]);
    return (
        <Box>
            <Grid container>
                <Grid item xs={12} display="flex">
                    <Tooltip title="Trở lại" arrow>
                        <Button
                            aria-label="Trở lại"
                            variant="contained"
                            onClick={() => {
                                setShowListTrip(true);
                                setSelectedSeats([]);
                            }}
                            startIcon={<ArrowBackIosIcon />}
                            sx={{ ml: 1 }}
                        >
                            Trở lại
                        </Button>
                    </Tooltip>
                    <Tooltip title="Đặt vé" arrow>
                        <Button
                            aria-label="Đặt vé"
                            variant="contained"
                            onClick={() => {
                                if (selectedSeats.length == 0) {
                                    setErrorText("Vui lòng chọn chỗ ngồi");
                                    setShowError(true);
                                } else {
                                    setShowError(false);
                                    handleAddClick(selectedSeats);
                                }
                            }}
                            startIcon={<AddIcon />}
                            sx={{ ml: 1 }}
                        >
                            Đặt vé
                        </Button>
                    </Tooltip>
                    {showError && (
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{ color: "red", alignSelf: "center", ml: 1 }}
                        >
                            {errorText}
                        </Typography>
                    )}
                </Grid>

                {Array.from(Array(capacity).keys()).map(
                    (seat: number, index) => {
                        let isBooked = seatDetail.seat_detail.some(
                            (seat) => seat.seat === `${index + 1}`
                        );
                        // if (isBooked) {
                        //     customer = seatDetail.seat_detail.find(
                        //         (seat) => seat.seat === `${index + 1}`
                        //     )!.customer;
                        // }
                        let isSelected = false;
                        if (selectedSeats.includes(seat + 1)) {
                            isSelected = true;
                        }
                        if (selectedSeatsBooked.includes(seat + 1)) {
                            isSelected = true;
                        }

                        return (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                xl={3}
                                key={index}
                            >
                                <Box>
                                    <Card
                                        elevation={2}
                                        sx={{
                                            margin: "10px",
                                            width: "auto",
                                        }}
                                        className={clsx({
                                            selected: isSelected,
                                            booked: isBooked,
                                        })}
                                    >
                                        <Tooltip
                                            title="Chọn chỗ"
                                            arrow
                                            placement="bottom"
                                        >
                                            <CardActionArea
                                                // pl={3}
                                                onClick={() => {
                                                    handleClickToSeat(seat + 1);
                                                    if (isBooked) {
                                                        handleClickToSeatBooked(
                                                            seat + 1
                                                        );
                                                    }
                                                }}
                                                sx={{
                                                    // display: "flex",
                                                    padding: "12px 16px",
                                                    // justifyContent: "center",
                                                    // alignItems: "flex-start",
                                                }}
                                            >
                                                <Box sx={{ height: "200px" }}>
                                                    <Box
                                                        display="flex"
                                                        sx={{
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Box
                                                            display="flex"
                                                            sx={{
                                                                alignItems:
                                                                    "baseline",
                                                            }}
                                                            color={
                                                                PureLightTheme
                                                                    .colors
                                                                    .primary
                                                                    .main
                                                            }
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                color={
                                                                    PureLightTheme
                                                                        .colors
                                                                        .primary
                                                                        .main
                                                                }
                                                            >
                                                                {`Ghế số: `}
                                                            </Typography>
                                                            <Typography
                                                                variant="h4"
                                                                ml={1}
                                                            >
                                                                {(
                                                                    seat + 1
                                                                ).toString()}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {isBooked && (
                                                        <Box mt={1}>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    {`Tên: `}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {
                                                                        seatDetail.seat_detail.find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                            ?.customer
                                                                            .name
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    {`Số điện thoại: `}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {seatDetail.seat_detail
                                                                        .find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                        ?.customer.phonenumber.toString()}
                                                                </Typography>
                                                            </Box>

                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "flex-end",
                                                                    mt: 1,
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {getNameLocatioin(
                                                                        false,
                                                                        seatDetail.seat_detail.find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                            ?.booking
                                                                            .pickup_point
                                                                    )}
                                                                </Typography>
                                                                <Avatar
                                                                    sx={{
                                                                        ml: 1,
                                                                        height: "100%",
                                                                        width: "auto",
                                                                        backgroundColor:
                                                                            "black",
                                                                    }}
                                                                >
                                                                    <ArrowDropUpIcon
                                                                        sx={{
                                                                            height: "1rem",
                                                                            width: "1rem",
                                                                        }}
                                                                    />
                                                                </Avatar>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {getNameLocatioin(
                                                                        true,
                                                                        seatDetail.seat_detail.find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                            ?.booking
                                                                            .dropoff_point
                                                                    )}
                                                                </Typography>
                                                                <Avatar
                                                                    sx={{
                                                                        ml: 1,
                                                                        height: "100%",
                                                                        width: "auto",
                                                                        backgroundColor:
                                                                            "black",
                                                                    }}
                                                                >
                                                                    <ArrowDropDownIcon
                                                                        sx={{
                                                                            height: "1rem",
                                                                            width: "1rem",
                                                                        }}
                                                                    />
                                                                </Avatar>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </CardActionArea>
                                        </Tooltip>
                                    </Card>
                                </Box>
                            </Grid>
                        );
                    }
                )}
            </Grid>
        </Box>
    );
}
