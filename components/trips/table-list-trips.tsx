import React from "react";
import { Box } from "@mui/system";
import {
    Grid,
    Typography,
    Card,
    CardActions,
    IconButton,
    CardActionArea,
    Tooltip,
    CardContent,
    Avatar,
    styled,
    // alpha,
} from "@mui/material";
// import clsx from "clsx";\
import AddIcon from "@mui/icons-material/Add";
import { ITrip, ITripForm, NameValue } from "@/models";
import ClearIcon from "@mui/icons-material/Clear";

// import TablePaginationActions from "./table-with-paging";

// import { Identifier } from "typescript";
export interface ITableListCarProps {
    listTrips?: Array<ITrip> | [];
    listProvince: Array<NameValue> | [];
    // eslint-disable-next-line no-unused-vars
    handleEditClick: (data: ITripForm) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveClick: (data: ITripForm) => void;
    setShowTripForm: React.Dispatch<React.SetStateAction<boolean>>;
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

const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);

const CardAddAction = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(["all"])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);
export function TableListTrips({
    listTrips,
    listProvince,
    handleEditClick,
    handleRemoveClick,
    setShowTripForm,
}: ITableListCarProps) {
    return (
        <Box sx={{ mt: 2 }}>
            <Grid container>
                {listTrips &&
                    listTrips.map((trip: ITrip, index) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{ paddingLeft: 1, paddingTop: 1 }}
                        >
                            <Card elevation={2} sx={{ height: "100%" }}>
                                <CardActions disableSpacing>
                                    <Typography
                                        gutterBottom
                                        variant="h3"
                                        component="h3"
                                        sx={{ m: 1 }}
                                    >
                                        {trip.departure_time}
                                    </Typography>
                                    <Box sx={{ marginLeft: "auto" }}>
                                        <Tooltip title="Xoá" arrow>
                                            <IconButton
                                                aria-label="Xoá"
                                                onClick={() =>
                                                    handleRemoveClick({
                                                        ...trip,
                                                        car_id: trip.car._id,
                                                        capacity:
                                                            trip.car.capacity,
                                                    })
                                                }
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CardActions>
                                <Tooltip
                                    title="Sửa lịch chạy"
                                    arrow
                                    placement="bottom"
                                >
                                    <CardActionArea
                                        // pl={3}
                                        onClick={() =>
                                            handleEditClick({
                                                ...trip,
                                                car_id: trip.car._id,
                                                capacity: trip.car.capacity,
                                            })
                                        }
                                        sx={{
                                            display: "flex",
                                            padding: "12px 16px",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            sx={{
                                                justifyContent: "space-between",
                                            }}
                                        ></Box>

                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-start" }}
                                        >
                                            <Typography
                                                variant="h6"
                                                // ml={1}
                                                alignSelf="flex-start"
                                            >
                                                {`${getName(
                                                    listProvince,
                                                    trip.from_id
                                                )} - ${getName(
                                                    listProvince,
                                                    trip.to_id
                                                )}`}
                                            </Typography>
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
                                                    maxWidth: "198px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {`${trip.car.name}`}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-start" }}
                                        >
                                            <Typography>Biển số:</Typography>
                                            <Typography variant="h6" ml={1}>
                                                {`${trip.car.license_plate}`}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-start" }}
                                        >
                                            <Typography>Tài xế:</Typography>
                                            <Typography variant="h6" ml={1}>
                                                {`${trip.car.driver_name}`}
                                            </Typography>
                                        </Box>
                                        <Box
                                            display="flex"
                                            sx={{ alignItems: "flex-start" }}
                                        >
                                            <Typography>Số ghế:</Typography>
                                            <Typography variant="h6" ml={1}>
                                                {`${trip.car.capacity}`}
                                            </Typography>
                                        </Box>
                                    </CardActionArea>
                                </Tooltip>
                            </Card>
                        </Grid>
                    ))}

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ paddingLeft: 1, paddingTop: 1 }}
                >
                    <Card sx={{ height: "100%" }}>
                        <Tooltip title="Thêm" arrow>
                            <CardAddAction>
                                <CardActionArea
                                    sx={{
                                        px: 1,
                                    }}
                                    onClick={() => {
                                        //console.log("add");
                                        setShowTripForm(true);
                                    }}
                                >
                                    <CardContent>
                                        <AvatarAddWrapper>
                                            <AddIcon fontSize="large" />
                                        </AvatarAddWrapper>
                                    </CardContent>
                                </CardActionArea>
                            </CardAddAction>
                        </Tooltip>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
