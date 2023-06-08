import IBookingTrip from "@/models/Book/book-trip";
import React, { useState } from "react";
import { Box } from "@mui/system";
import {
    Button,
    ButtonProps,
    Divider,
    Link,
    Paper,
    PaperProps,
    styled,
    Tooltip,
    Typography,
} from "@mui/material";
import LoadingPage from "../common/loading";
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

export interface IListBookingProps {
    listData: Array<IBookingTrip>;
    listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
    // eslint-disable-next-line no-unused-vars
    addBooking: (data: IBookingForm) => void;
}
const TripWrapper = styled(Paper)<PaperProps>(
    ({ theme }) => `
    background-color: ${theme.colors.primary.lighter};
  `
);
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
}: IListBookingProps) {
    const dispatch = useDispatch();
    const [showDetail, setShowDetail] = useState({
        isBook: false,
        isDetail: false,
        tripId: "",
    } as showStateType);
    if (!listData || !listDropoffAndPickUp) {
        return <LoadingPage />;
    }
    // console.log(listData);

    return (
        <Box component="section" bgcolor="light">
            {listData.map((item: IBookingTrip) => {
                const dropoff = getName(
                    listDropoffAndPickUp.dropoff,
                    `${item.dropoff_point[0]!.district_id}-${
                        item.dropoff_point[0]!.point_id
                    }`
                );
                const pickup = getName(
                    listDropoffAndPickUp.pickup,
                    `${item.pickup_point[0]!.district_id}-${
                        item.pickup_point[0]!.point_id
                    }`
                );
                return (
                    <TripWrapper
                        sx={{
                            marginBottom: "15px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        key={item._id}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifySelf: "center",
                                marginLeft: "10px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    mr: "30px",
                                }}
                            >
                                <Box
                                    component="img"
                                    sx={{
                                        height: 180,
                                        width: 180,
                                    }}
                                    src={item.car.imgPath}
                                />
                            </Box>

                            <Box
                                sx={{
                                    marginTop: "10px",
                                    mr: "40px",
                                    width: "310px",
                                }}
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
                                        color: "rgb(72, 72, 72)",
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
                                                    color: "#223354",
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
                                                    color: "#223354",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "195px",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {`${dropoff}`}
                                            </Typography>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                }}
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
                                    }}
                                >
                                    {item.sell_type == "book_online" ? (
                                        <ColorButton
                                            variant="contained"
                                            onClick={() => {
                                                console.log(item);
                                                dispatch(resetState());

                                                dispatch(setSelectedTrip(item));

                                                setShowDetail({
                                                    isBook:
                                                        showDetail.tripId ==
                                                        item._id
                                                            ? !showDetail.isBook
                                                            : true,
                                                    isDetail: false,
                                                    tripId:
                                                        showDetail.tripId ==
                                                        item._id
                                                            ? ""
                                                            : item._id,
                                                });
                                            }}
                                            // sx={{ mb: "110px" }}
                                        >
                                            {showDetail.isBook &&
                                            showDetail.tripId == item._id
                                                ? `Đóng`
                                                : `Đặt vé`}
                                        </ColorButton>
                                    ) : (
                                        <ColorButton
                                            variant="contained"
                                            onClick={() => {
                                                dispatch(resetState());
                                                dispatch(setSelectedTrip(item));

                                                setShowDetail({
                                                    isBook:
                                                        showDetail.tripId ==
                                                        item._id
                                                            ? !showDetail.isBook
                                                            : true,
                                                    isDetail: false,
                                                    tripId:
                                                        showDetail.tripId ==
                                                        item._id
                                                            ? ""
                                                            : item._id,
                                                });
                                            }}
                                            // sx={{ mb: "110px" }}
                                        >
                                            {showDetail.isBook &&
                                            showDetail.tripId == item._id
                                                ? `Đóng`
                                                : `Gọi đặt vé`}
                                        </ColorButton>
                                    )}
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
                                        }}
                                        onClick={() => {
                                            dispatch(setSelectedTrip(item));
                                            setShowDetail({
                                                isBook: false,
                                                isDetail:
                                                    showDetail.tripId ==
                                                    item._id
                                                        ? !showDetail.isDetail
                                                        : true,
                                                tripId:
                                                    showDetail.tripId ==
                                                    item._id
                                                        ? ""
                                                        : item._id,
                                            });
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                color: PureLightTheme.colors
                                                    .primary.main,
                                            }}
                                        >
                                            Chi tiết
                                        </Typography>
                                        {showDetail.isDetail &&
                                        showDetail.tripId == item._id ? (
                                            <ArrowDropUpIcon
                                                sx={{
                                                    color: PureLightTheme.colors
                                                        .primary.main,
                                                }}
                                            />
                                        ) : (
                                            <ArrowDropDownIcon
                                                sx={{
                                                    color: PureLightTheme.colors
                                                        .primary.main,
                                                }}
                                            />
                                        )}
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                        {showDetail.isDetail &&
                            showDetail.tripId == item._id && (
                                <Box>
                                    <Divider sx={{ marginTop: "10px" }} />
                                    <Box sx={{ marginTop: "20px" }}>
                                        <TabDetailTrip
                                            listDropoffAndPickUp={
                                                listDropoffAndPickUp
                                            }
                                            setShowDetail={setShowDetail}
                                            trip_detail={item}
                                        />
                                    </Box>
                                </Box>
                            )}
                        {showDetail.isBook && showDetail.tripId == item._id && (
                            <Box>
                                {item?.sell_type == "book_online" ? (
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
                                            Liên hệ đặt chỗ: 09321321312
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </TripWrapper>
                );
            })}
        </Box>
    );
}
