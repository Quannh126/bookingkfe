import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography, Card, CardActionArea, Tooltip } from "@mui/material";
// import clsx from "clsx";
import { NameValue } from "@/models";
import IBookingTrip from "@/models/Book/book-trip";

export interface ITableListCarProps {
    // listTrips?: Array<ITrip> | [];
    listProvince: Array<NameValue> | [];
    listBooking?: Array<IBookingTrip> | [];
    // eslint-disable-next-line no-unused-vars
    handleClickToTrip: (data: IBookingTrip) => void;
}

// const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function getName(list: Array<NameValue>, value: String): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === value) {
            return list[i].name;
        }
    }
    return "";
}

export function TableListBooking({
    // listTrips,
    listProvince,
    listBooking,
    handleClickToTrip,
}: ITableListCarProps) {
    return (
        <Box sx={{}}>
            <Grid container>
                {listBooking &&
                    listBooking!.map((trip: IBookingTrip, index) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={2}
                            sx={{ paddingLeft: 1, paddingTop: 1 }}
                        >
                            <Card
                                elevation={2}
                                sx={{
                                    width: "auto",
                                }}
                            >
                                <Tooltip
                                    title="Đặt vé"
                                    arrow
                                    placement="bottom"
                                >
                                    <CardActionArea
                                        // pl={3}
                                        onClick={() => handleClickToTrip(trip)}
                                        sx={{
                                            // display: "flex",
                                            padding: "12px 16px",
                                            // justifyContent: "center",
                                            // alignItems: "flex-start",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",

                                                justifyContent: "flex-start",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <Typography
                                                variant="h2"
                                                component="h2"
                                                sx={{ m: 1 }}
                                            >
                                                {trip.departure_time}
                                            </Typography>
                                            <Box sx={{ marginLeft: "auto" }}>
                                                <Typography
                                                    variant="h3"
                                                    component="h3"
                                                    sx={{
                                                        m: 1,
                                                        alignSelf: "flex-end",
                                                    }}
                                                >
                                                    {trip.seat_booked}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box
                                            display="flex"
                                            sx={{
                                                justifyContent: "space-between",
                                            }}
                                        ></Box>
                                        <Box>
                                            <Box
                                                display="flex"
                                                sx={{ alignItems: "flex-end" }}
                                            >
                                                <Typography> Từ: </Typography>
                                                <Typography
                                                    variant="body1"
                                                    ml={1}
                                                >
                                                    {getName(
                                                        listProvince,
                                                        trip.from_id
                                                    )}
                                                </Typography>
                                                {/* <Typography>Ha Noi</Typography> */}
                                            </Box>
                                            <Box
                                                display="flex"
                                                sx={{ alignItems: "flex-end" }}
                                            >
                                                <Typography> Đến: </Typography>
                                                <Typography
                                                    variant="body1"
                                                    ml={1}
                                                >
                                                    {getName(
                                                        listProvince,
                                                        trip.to_id
                                                    )}
                                                </Typography>
                                                {/* <Typography>Ha Noi</Typography> */}
                                            </Box>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-end" }}
                                        >
                                            <Typography> Xe: </Typography>
                                            <Typography
                                                variant="body1"
                                                ml={1}
                                                sx={{
                                                    textOverflow: "ellipsis",

                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {`${trip.car.name}`}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-end" }}
                                        >
                                            <Typography> Biển số: </Typography>
                                            <Typography variant="body1" ml={1}>
                                                {`${trip.car.license_plate}`}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-end" }}
                                        >
                                            <Typography>
                                                {" "}
                                                Tên tài xế:{" "}
                                            </Typography>
                                            <Typography variant="body1" ml={1}>
                                                {`${trip.car.driver_name}`}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-end" }}
                                        >
                                            <Typography>
                                                Số điện thoại:{" "}
                                            </Typography>
                                            <Typography variant="body1" ml={1}>
                                                {`${trip.car.phonenumber}`}
                                            </Typography>
                                        </Box>
                                    </CardActionArea>
                                </Tooltip>
                            </Card>
                        </Grid>
                    ))}
                <Grid xs={12} md={4} item>
                    <Box></Box>
                </Grid>
            </Grid>
        </Box>
    );
}
