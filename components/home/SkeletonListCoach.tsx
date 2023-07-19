import { CardContent, Grid, Paper, Skeleton } from "@mui/material";
// import { Box } from "@mui/system";
import * as React from "react";

export interface ISkeletonListCoachProps {}
const arrrayRandom = [1, 2, 3, 4, 5];
export default function SkeletonListCoach() {
    return (
        <Grid container direction="column" rowSpacing={2}>
            {arrrayRandom.map((item, index) => {
                return (
                    <Grid item xs={12} key={index}>
                        <Paper>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={4}
                                        display="flex"
                                        sx={{ justifyContent: "center" }}
                                    >
                                        <Skeleton
                                            height="200px"
                                            width="200px"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        display="flex"
                                        sx={{
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Skeleton
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />
                                        <Skeleton
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />

                                        <Skeleton
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />

                                        <Skeleton
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={2}
                                        display="flex"
                                        sx={{
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Skeleton
                                            width="100%"
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />
                                        <Skeleton
                                            width="100%"
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />
                                        <Skeleton
                                            width="100%"
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />
                                        <Skeleton
                                            width="100%"
                                            sx={{
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}
