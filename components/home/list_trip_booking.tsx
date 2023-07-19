import IBookingTrip from "@/models/Book/book-trip";
import React, { useState } from "react";
import { Box } from "@mui/system";
import {
    Button,
    ButtonProps,
    CardContent,
    Divider,
    Grid,
    Link,
    Paper,
    // PaperProps,
    styled,
    Tooltip,
    Typography,
} from "@mui/material";
// import LoadingPage from "../common/loading";
import { useDispatch } from "react-redux";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlaceIcon from "@mui/icons-material/Place";
import { IBookingForm, NameValue } from "@/models";
import { PureLightTheme } from "@/utils";
import TabDetailTrip from "./tab_detail";
import StepForm from "./stepForm/StepForm";
import { setSelectedTrip } from "@/redux/selectedTrip";
import { resetState } from "@/redux/stepForm";
import dayjs from "dayjs";
import { CreateURLPayment } from "@/hooks";
import { KeyedMutator } from "swr";

export interface IListBookingProps {
    listData: Array<IBookingTrip>;
    listDropoffAndPickUp?: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
    // eslint-disable-next-line no-unused-vars
    addBooking: (data: IBookingForm) => void;
    // eslint-disable-next-line no-unused-vars
    createURL: (data: CreateURLPayment) => void;
    mutate: KeyedMutator<IBookingTrip[]>;
}
// const Paper = styled(Paper)<PaperProps>(
//     ({ theme }) => `

//     display: "flex",
//   `
// );

// const LinkDetailWrapper = styled(Link)<LinkProps>(
//     ({ theme }) => `
//     display: "flex",
//     mr: ${theme.spacing(1)},
//     padding-top: ${theme.spacing(1)},
//     background-color: ${theme.colors.primary.lighter};
//   `
// );
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(theme.colors.warning.main),
    backgroundColor: theme.colors.warning.main,
    "&:hover": {
        backgroundColor: theme.colors.warning.dark,
    },
}));
function getName(list: Array<NameValue>, value: String): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === value) {
            return list[i].name;
        }
    }
    return "";
}
export type showStateType = {
    isBook: boolean;
    isDetail: boolean;
    tripId: string;
};
export default function ListBooking({
    listData,
    listDropoffAndPickUp,
    mutate,
}: IListBookingProps) {
    const dispatch = useDispatch();
    const [showDetail, setShowDetail] = useState({
        isBook: false,
        isDetail: false,
        tripId: "",
    } as showStateType);
    // const [showBooking, setShowBooking] = useState({ isBook: false, tripId: ""});
    // if (!listData || !listDropoffAndPickUp) {
    //     return <LoadingPage />;
    // }
    // console.log(listData);
    return (
        <Grid container direction="column" rowSpacing={2}>
            {listData.map((item: IBookingTrip) => {
                const dropoff = getName(
                    listDropoffAndPickUp!.dropoff,
                    `${item.dropoff_point[0]!.district_id}-${
                        item.dropoff_point[0]!.point_id
                    }`
                );
                const pickup = getName(
                    listDropoffAndPickUp!.pickup,
                    `${item.pickup_point[0]!.district_id}-${
                        item.pickup_point[0]!.point_id
                    }`
                );
                return (
                    <Grid item key={item._id} xs={12}>
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
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 200,
                                                width: 200,
                                            }}
                                            src={item.car.imgPath}
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
                                        // sx={{
                                        //     marginTop: "10px",
                                        //     mr: "40px",
                                        //     width: "310px",
                                        // }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item.car.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                mt: "20px",
                                                mb: "20px",
                                                fontSize: "14px",
                                                // color: "rgb(72, 72, 72)",
                                            }}
                                        >
                                            {`${item.car.type_car} ${item.car.capacity} Chỗ`}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <RadioButtonUncheckedIcon
                                                    fontWeight={500}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: "20px",
                                                        fontWeight: "bold",
                                                        minWidth: "60px",
                                                    }}
                                                >
                                                    {`${item.departure_time}`}
                                                </Typography>
                                                <Tooltip
                                                    title={pickup}
                                                    arrow
                                                    placement="top-end"
                                                >
                                                    <Typography
                                                        ml={1}
                                                        sx={{
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        {`${pickup}`}
                                                    </Typography>
                                                </Tooltip>
                                            </Box>
                                            <MoreVertIcon fontWeight={500} />
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <PlaceIcon fontWeight={500} />
                                                <Typography
                                                    fontWeight={500}
                                                    sx={{
                                                        fontSize: "20px",
                                                        fontWeight: "bold",
                                                        minWidth: "60px",
                                                    }}
                                                >
                                                    {`${item.destination_time}`}
                                                </Typography>
                                                <Tooltip
                                                    title={dropoff}
                                                    arrow
                                                    placement="bottom-end"
                                                >
                                                    <Typography
                                                        ml={1}
                                                        sx={{
                                                            fontSize: "14px",

                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                            maxWidth: "195px",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        {`${dropoff}`}
                                                    </Typography>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={2}
                                        display="flex"
                                        sx={{
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                        // sx={{
                                        //     display: "flex",
                                        //     flexDirection: "column",
                                        //     justifyContent: "flex-end",
                                        // }}
                                    >
                                        <Box
                                            sx={{
                                                height: "100%",
                                                mb: "18px",
                                                mt: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                justifyContent: "space-between",
                                                "@media (max-width:600px)": {
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                    alignItems: "flex-end",
                                                },
                                            }}
                                        >
                                            {item.journey_date !==
                                            dayjs(new Date()).format(
                                                "YYYY-MM-DD"
                                            ) ? (
                                                <ColorButton
                                                    variant="contained"
                                                    onClick={() => {
                                                        // console.log(item);
                                                        mutate();
                                                        dispatch(resetState());
                                                        console.log(
                                                            listDropoffAndPickUp
                                                        );

                                                        dispatch(
                                                            setSelectedTrip(
                                                                item
                                                            )
                                                        );

                                                        setShowDetail({
                                                            isBook:
                                                                showDetail.isBook &&
                                                                showDetail.tripId ==
                                                                    item._id
                                                                    ? false
                                                                    : true,
                                                            isDetail: false,
                                                            tripId: item._id,
                                                        });
                                                    }}
                                                    // sx={{ mb: "110px" }}
                                                >
                                                    {showDetail.isBook &&
                                                    showDetail.tripId ==
                                                        item._id
                                                        ? `Đóng`
                                                        : `Đặt vé`}
                                                </ColorButton>
                                            ) : (
                                                <ColorButton
                                                    variant="contained"
                                                    onClick={() => {
                                                        dispatch(resetState());
                                                        dispatch(
                                                            setSelectedTrip(
                                                                item
                                                            )
                                                        );

                                                        setShowDetail({
                                                            isBook:
                                                                showDetail.tripId ==
                                                                item._id
                                                                    ? !showDetail.isBook
                                                                    : true,
                                                            isDetail: false,
                                                            tripId: item._id,
                                                        });
                                                    }}
                                                    // sx={{ mb: "110px" }}
                                                >
                                                    {showDetail.isBook &&
                                                    showDetail.tripId ==
                                                        item._id
                                                        ? `Đóng`
                                                        : `Gọi đặt vé`}
                                                </ColorButton>
                                            )}
                                            <Typography
                                                component="p"
                                                variant="h4"
                                                sx={{
                                                    marginTop: "auto",
                                                }}
                                            >
                                                {`${parseFloat(
                                                    item.fare
                                                ).toLocaleString()} đ`}
                                            </Typography>
                                            <Typography
                                                component="p"
                                                variant="h5"
                                                sx={{ marginTop: "auto" }}
                                            >
                                                {`Còn ${
                                                    Number(item.car.capacity) -
                                                    item.seat_detail.length
                                                } ghế trống`}
                                            </Typography>
                                            <Link
                                                sx={{
                                                    display: "flex",
                                                    mr: "5px",
                                                    paddingTop: "5px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    dispatch(
                                                        setSelectedTrip(item)
                                                    );
                                                    setShowDetail({
                                                        isBook: false,
                                                        isDetail:
                                                            showDetail.tripId ==
                                                            item._id
                                                                ? !showDetail.isDetail
                                                                : true,
                                                        tripId: item._id,
                                                    });
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                    }}
                                                >
                                                    Chi tiết
                                                </Typography>
                                                {showDetail.isDetail &&
                                                showDetail.tripId ==
                                                    item._id ? (
                                                    <ArrowDropUpIcon
                                                        sx={{
                                                            color: PureLightTheme
                                                                .colors.primary
                                                                .main,
                                                        }}
                                                    />
                                                ) : (
                                                    <ArrowDropDownIcon
                                                        sx={{
                                                            color: PureLightTheme
                                                                .colors.primary
                                                                .main,
                                                        }}
                                                    />
                                                )}
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                                {showDetail.isDetail &&
                                    showDetail.tripId == item._id && (
                                        <Box>
                                            <Divider
                                                sx={{ marginTop: "10px" }}
                                            />
                                            <Box sx={{ marginTop: "20px" }}>
                                                <TabDetailTrip
                                                    listDropoffAndPickUp={
                                                        listDropoffAndPickUp!
                                                    }
                                                    setShowDetail={
                                                        setShowDetail
                                                    }
                                                    trip_detail={item}
                                                />
                                            </Box>
                                        </Box>
                                    )}
                                {showDetail.isBook &&
                                    showDetail.tripId == item._id && (
                                        <Box>
                                            {item.journey_date !==
                                            dayjs(new Date()).format(
                                                "YYYY-MM-DD"
                                            ) ? (
                                                <StepForm />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        padding: "30px",

                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "stretch",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        align="center"
                                                        sx={{ py: 4 }}
                                                    >
                                                        Liên hệ đặt chỗ:
                                                        09321321312
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                            </CardContent>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}
