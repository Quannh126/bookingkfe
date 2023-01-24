import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography, Paper } from "@mui/material";
// import clsx from "clsx";
import { ITrip } from "@/models";
// import TablePaginationActions from "./table-with-paging";

// import { Identifier } from "typescript";
export interface ITableListCarProps {
    listTrips?: Array<ITrip> | [];
}

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export function TableListTrips({ listTrips }: ITableListCarProps) {
    return (
        <Box sx={{}}>
            <Grid container spacing={3}>
                {listTrips &&
                    list.map((item: Number, index) => (
                        <Grid key={index} item xs={12} md={3}>
                            <Paper
                                elevation={2}
                                sx={{
                                    backgroundColor: "#ffe5c2",
                                }}
                                // className={clsx({
                                //     fullColor:
                                //         listTrips[index].seats_booked.length ===
                                //         Number(listTrips[index].car.capacity),
                                //     organdColor:
                                //         listTrips[index].seats_booked.length ===
                                //         Number(listTrips[index].car.capacity),
                                // })}
                            >
                                <Box
                                    // pl={3}
                                    sx={{
                                        display: "flex",
                                        padding: "12px 16px",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        display="flex"
                                        sx={{
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            12:30
                                        </Typography>
                                        <Box
                                        // className={clsx({
                                        //     fullColorCapacity:
                                        //         listTrips[index]
                                        //             .seats_booked.length ===
                                        //         Number(
                                        //             listTrips[index].car
                                        //                 .capacity
                                        //         ),
                                        //     organdColorCapacity:
                                        //         listTrips[index]
                                        //             .seats_booked.length ===
                                        //         Number(
                                        //             listTrips[index].car
                                        //                 .capacity
                                        //         ),
                                        // })}
                                        >
                                            {12}/{30}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography>
                                                From: Tuyen Quang
                                            </Typography>
                                            {/* <Typography>Ha Noi</Typography> */}
                                        </Box>
                                        <Box>
                                            <Typography>To: Ha Noi</Typography>
                                            {/* <Typography>Ha Noi</Typography> */}
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography>
                                            Biển số: 12A3-1221
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}
