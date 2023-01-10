import React from "react";
import { Box } from "@mui/system";
import { Grid, Link, Typography, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
// import TablePaginationActions from "./table-with-paging";

// import { Identifier } from "typescript";
export interface ITableListCarProps {
    listTrips: string;
}

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export function TableListTrips({ listTrips }: ITableListCarProps) {
    return (
        <Box p={2} sx={{}}>
            <Grid container spacing={3}>
                {listTrips &&
                    list.map((item: Number, index) => (
                        <Grid key={index} item xs={12} md={6}>
                            <Paper elevation={2}>
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
                                            variant="h6"
                                            component="div"
                                        >
                                            Hà Nội
                                        </Typography>
                                        <Box>
                                            <IconButton
                                                aria-label="Edit"
                                                //onClick={() => handleEditClick(car)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Delete"
                                                //onClick={() => handleRemoveClick(car)}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box
                                        display="flex"
                                        sx={{
                                            justifyContent: "space-between",
                                            "& div": {
                                                mt: 1,
                                                mb: 1,
                                            },
                                        }}
                                    >
                                        <Box>
                                            <Typography>From</Typography>
                                            <Typography>Ha Noi</Typography>
                                        </Box>
                                        <Box>
                                            <Typography>To</Typography>
                                            <Typography>Ha Noi</Typography>
                                        </Box>
                                        <Box>
                                            <Typography>Fare</Typography>
                                            <Typography>136000</Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        display="flex"
                                        sx={{
                                            justifyContent: "space-between",
                                            "& div": {
                                                mt: 1,
                                                mb: 1,
                                            },
                                        }}
                                    >
                                        <Typography>JourenyDate:</Typography>

                                        <Typography>Ha Noi</Typography>
                                    </Box>
                                    <Link>Booking</Link>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}
