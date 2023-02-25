import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    Grid,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {} from "@mui/material";
import clsx from "clsx";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IBookingTrip from "@/models/Book/book-trip";
import { NameValue } from "@/models";
import { PureLightTheme } from "@/utils";
import EditIcon from "@mui/icons-material/Edit";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PrintIcon from "@mui/icons-material/Print";
// import { ICustomer } from "@/models";
// import "../../styles/globals.css";
export interface ISeatSelectionProps {
    selectedSeats: Array<number>;
    selectedSeatsBooked: Array<number>;
    // eslint-disable-next-line no-unused-vars
    handleChooseSwapSeat: (seat: number) => void;
    handleSwapClick: () => void;
    setSelectedSeatsBooked: React.Dispatch<React.SetStateAction<Array<number>>>;
    setSelectedSeats: React.Dispatch<React.SetStateAction<Array<number>>>;
    setShowListTrip: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
    setSwapId: React.Dispatch<React.SetStateAction<string>>;
    setSwapSeat: React.Dispatch<React.SetStateAction<number>>;
    swapSeat: number;
    singleSelectMode: boolean;
    tripDetail: IBookingTrip;
    // eslint-disable-next-line no-unused-vars
    handleAddClick: (selectedSeats: Array<number>) => void;
    listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
    // eslint-disable-next-line no-unused-vars
    handleUpdateClick: (selectedSeats: Array<number>) => void;
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
    handleUpdateClick,
    // setSingleSelectMode,
    singleSelectMode,
    handleSwapClick,
    setSwapId,
    handleChooseSwapSeat,
    setSwapSeat,
    swapSeat,
    setSingleSelectMode,
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
        console.log(tripDetail);
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
                        let isSelected = false;
                        if (selectedSeats.includes(seat + 1)) {
                            isSelected = true;
                        }
                        if (selectedSeatsBooked.includes(seat + 1)) {
                            isSelected = true;
                        }
                        let isSwapSeat = seat + 1 === swapSeat;
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
                                            "my-card selected": isSelected,
                                            "my-card": !isSelected,
                                            focus: isSwapSeat,
                                        })}
                                    >
                                        <CardActionArea
                                            // pl={3}
                                            onClick={async () => {
                                                if (!singleSelectMode) {
                                                    handleClickToSeat(seat + 1);
                                                    if (isBooked) {
                                                        handleClickToSeatBooked(
                                                            seat + 1
                                                        );
                                                    }
                                                } else {
                                                    if (seat + 1 !== swapSeat) {
                                                        handleChooseSwapSeat(
                                                            seat + 1
                                                        );
                                                    } else {
                                                        setSwapSeat(-1);
                                                        setSingleSelectMode(
                                                            false
                                                        );
                                                    }
                                                }
                                            }}
                                            sx={{
                                                padding: "12px 16px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: "200px",
                                                }}
                                            >
                                                <Box
                                                    display="flex"
                                                    sx={{
                                                        alignItems: "center",
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
                                                            !isBooked
                                                                ? PureLightTheme
                                                                      .colors
                                                                      .primary
                                                                      .main
                                                                : PureLightTheme
                                                                      .colors
                                                                      .warning
                                                                      .dark
                                                        }
                                                    >
                                                        <Typography variant="body2">
                                                            {`Ghế: `}
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
                                                                    )?.customer
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
                                                                    "flex-end",
                                                            }}
                                                        >
                                                            <Typography variant="body2">
                                                                {`Giá: `}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                ml={1}
                                                            >
                                                                {`${Number(
                                                                    seatDetail.seat_detail.find(
                                                                        (
                                                                            seat
                                                                        ) =>
                                                                            seat.seat ===
                                                                            `${
                                                                                index +
                                                                                1
                                                                            }`
                                                                    )?.booking
                                                                        .fare
                                                                ).toLocaleString()} VNĐ `}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color={
                                                                    PureLightTheme
                                                                        .colors
                                                                        .error
                                                                        .light
                                                                }
                                                            >{`(${
                                                                seatDetail.seat_detail.filter(
                                                                    (seat) =>
                                                                        seat
                                                                            .customer
                                                                            ._id ==
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
                                                                            ._id
                                                                ).length
                                                            }G)`}</Typography>
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
                                                                    )?.booking
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
                                                                    )?.booking
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
                                        {isSelected && isBooked && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-evenly",
                                                    position: "absolute",
                                                    opacity: 1,
                                                    bottom: "20px",
                                                    left: 0,
                                                    width: "100%",
                                                }}
                                            >
                                                <Tooltip title="In vé xe" arrow>
                                                    <IconButton
                                                        aria-label="Print"
                                                        onClick={(e) => {
                                                            // console.log(
                                                            //     "click"
                                                            // );
                                                            if (
                                                                selectedSeatsBooked.length ==
                                                                0
                                                            ) {
                                                                setErrorText(
                                                                    "Chỉ có thể cập nhật những chỗ đã được đặt"
                                                                );
                                                                setShowError(
                                                                    true
                                                                );
                                                            } else {
                                                                setShowError(
                                                                    false
                                                                );
                                                                handleUpdateClick(
                                                                    selectedSeats
                                                                );
                                                            }
                                                            e.stopPropagation();
                                                        }}
                                                        className="button-container"
                                                    >
                                                        <PrintIcon
                                                            sx={{
                                                                color: PureLightTheme
                                                                    .colors
                                                                    .primary
                                                                    .main,
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Cập nhật" arrow>
                                                    <IconButton
                                                        aria-label="Edit"
                                                        onClick={(e) => {
                                                            // console.log(
                                                            //     "click"
                                                            // );
                                                            if (
                                                                selectedSeatsBooked.length ==
                                                                0
                                                            ) {
                                                                setErrorText(
                                                                    "Chỉ có thể cập nhật những chỗ đã được đặt"
                                                                );
                                                                setShowError(
                                                                    true
                                                                );
                                                            } else {
                                                                setShowError(
                                                                    false
                                                                );
                                                                handleUpdateClick(
                                                                    selectedSeats
                                                                );
                                                            }
                                                            e.stopPropagation();
                                                        }}
                                                        className="button-container"
                                                    >
                                                        <EditIcon
                                                            sx={{
                                                                color: PureLightTheme
                                                                    .colors
                                                                    .primary
                                                                    .main,
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Chuyển chỗ"
                                                    arrow
                                                >
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Changeseat"
                                                        onClick={async (e) => {
                                                            setSwapSeat(
                                                                seat + 1
                                                            );
                                                            handleSwapClick();

                                                            let booking_id =
                                                                await seatDetail.seat_detail.find(
                                                                    (seat) =>
                                                                        seat.seat ===
                                                                        `${
                                                                            index +
                                                                            1
                                                                        }`
                                                                )?.booking._id!;
                                                            setSwapId(
                                                                booking_id
                                                            );
                                                            e.stopPropagation();
                                                        }}
                                                        className="button-container"
                                                    >
                                                        <SwapHorizIcon
                                                            sx={{
                                                                color: PureLightTheme
                                                                    .colors
                                                                    .primary
                                                                    .main,
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        )}
                                        {!isBooked && (
                                            <Tooltip title="Đặt vé" arrow>
                                                <IconButton
                                                    aria-label="Đặt vé"
                                                    sx={{
                                                        position: "absolute",

                                                        opacity: "1",
                                                        top: "5px",
                                                        right: "5px",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (
                                                            selectedSeats.length !=
                                                            0
                                                        ) {
                                                            if (
                                                                !selectedSeats.includes(
                                                                    seat + 1
                                                                )
                                                            ) {
                                                                handleClickToSeat(
                                                                    seat + 1
                                                                );
                                                                setShowError(
                                                                    false
                                                                );
                                                                handleAddClick(
                                                                    selectedSeats
                                                                );
                                                            } else {
                                                                setShowError(
                                                                    false
                                                                );
                                                                handleAddClick(
                                                                    selectedSeats
                                                                );
                                                            }
                                                        } else {
                                                            // setErrorText(
                                                            //     "Vui lòng chọn chỗ ngồi"
                                                            // );
                                                            // setShowError(
                                                            //     true
                                                            // );
                                                            handleClickToSeat(
                                                                seat + 1
                                                            );
                                                            setShowError(false);
                                                            handleAddClick(
                                                                selectedSeats
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <AddIcon
                                                        sx={{
                                                            color: PureLightTheme
                                                                .colors.primary
                                                                .main,
                                                        }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        )}
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
