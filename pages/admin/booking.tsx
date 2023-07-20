// import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import {
    Button,
    CircularProgress,
    Container,
    // Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
} from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
// import { useTrip } from "@/hooks";
import {
    IBookingForm,
    IBookingUpdateForm,
    NameValue,
    NextpageWithLayout,
} from "@/models";
import React, { useEffect, useState } from "react";

// import { locationApi } from "@/api-client";
import useSWR, { SWRConfiguration } from "swr";
// import AdminLayout from "@/components/layout/admin";
import { TableListBooking } from "@/components/booking/table-list-booking";
import { DatePickerField, SelectFieldNormal } from "@/components/form";
import { IFilterTrip } from "@/models/Trips/trip-filter";
import { useForm } from "react-hook-form";
import { convertDateToString, getErrorMessage } from "@/utils";
import TripDetail from "@/components/booking/trip-detail";
import { BookForm, BookUpdateForm } from "@/components/booking";
import { useBooking } from "@/hooks/useBooking";
import IBookingTrip, { ISeatDetail } from "@/models/Book/book-trip";
// import LoadingPage from "@/components/common/loading";
// import { AlertContentProp, SnackAlert } from "@/components/common";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Route12, Route21 } from "@/config/routes";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Head from "next/head";
import moment from "moment";
import { toast } from "react-toastify";
import io from "socket.io-client";
require("dotenv").config();
const host = process.env.API_URL;
const socket = io(host!, { transports: ["websocket"] });
let count = 0;
const AdminBooking: NextpageWithLayout = () => {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<IBookingTrip>(
        {} as IBookingTrip
    );
    const [isPageLoading, setPageLoading] = useState(false);
    const [listIdBooking, setListIdBooking] = useState("");
    const [selectedTripId, setSelectedTripID] = useState("");
    const [showBookingUpdateForm, setShowBookingUpdateForm] = useState(false);
    const [queryParams, setQueryParams] = useState("");
    const [journeyDate, setJourneyDate] = useState(
        convertDateToString(new Date())
    );
    const [openWarning, setOpenWarning] = useState(false);
    // const [openSnack, setOpenSnack] = useState(false);
    // const [snackData, setSnackData] = useState({
    //     content: "",
    //     typeAlert: "info",
    //     openInit: false,
    // } as AlertContentProp);
    const [swapId, setSwapId] = useState("");
    const [alertText, setAlertText] = useState("");
    const [visibleAlertText, setVisibleAlertText] = useState(false);
    const [bookingData, setBookingData] = useState({} as ISeatDetail);
    const [showListTrip, setShowListTrip] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([] as Array<number>);
    const [selectedSeatsBooked, setSelectedSeatsBooked] = useState(
        [] as Array<number>
    );
    const [swapSeat, setSwapSeat] = useState(-1);
    const [singleSelectMode, setSingleSelectMode] = useState(false);
    // const { listTrips } = useTrip(queryParams);
    // const [change, setChange] = useState(false);

    const {
        listBooking,
        addBooking,
        updateBooking,
        updateSeat,
        removeBooking,
        isLoading,
        mutate,
    } = useBooking(queryParams);
    const {
        // register,
        control,
        watch,
        handleSubmit,
        // getValues,
        // setValue,
    } = useForm<IFilterTrip>({
        defaultValues: {
            s_journey_date: convertDateToString(new Date()),
            route: "1-2",
            from_point: "",
            to_point: "",
        },
        reValidateMode: "onSubmit",
    });
    const watchRoute = watch("route", "1-2");

    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowBookingForm(false);
        setVisibleAlertText(false);
        setAlertText("");
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowBookingUpdateForm(false);
        setVisibleAlertText(false);
        setAlertText("");
    };
    const handleClickToTrip = (data: IBookingTrip) => {
        setSelectedTrip(data);
        setSelectedTripID(data._id);
        setShowListTrip(false);
    };

    const handleSearchSubmit = (data: IFilterTrip) => {
        setSelectedTrip({} as IBookingTrip);
        let params = `/search?route=${data.route}&journey_date=${moment(
            data.s_journey_date
        ).format("YYYY-MM-DD")}&pickup_point=${data.from_point}&dropoff_point=${
            data.to_point
        }`;

        setQueryParams(params);
        setJourneyDate(moment(data.s_journey_date).format("YYYY-MM-DD"));
        setShowListTrip(true);
        setSelectedTrip({} as IBookingTrip);
        setSelectedTripID("");
    };

    const handleAddClick = () => {
        toast.dismiss();
        setShowBookingForm(true);
    };
    const handleUpdateClick = async () => {
        toast.dismiss();
        const seat_number = selectedSeatsBooked[0];

        const book_detail = await selectedTrip.seat_detail.find(
            (item) => Number(item.seat) === seat_number
        );

        const listId = await selectedSeatsBooked
            .reduce(
                (init, seat) =>
                    init +
                    "-" +
                    selectedTrip.seat_detail.find(
                        (item) => Number(item.seat) === seat
                    )?.booking._id,
                ""
            )
            .substring(1);
        if (book_detail) {
            setBookingData(book_detail);
            setListIdBooking(listId);
            setShowBookingUpdateForm(true);
        }
    };
    const handleSwapClick = () => {
        setSingleSelectMode(true);
        toast.info("Vui lòng chọn chỗ muốn đổi");
    };
    const handleClickDelete = () => {
        setOpenWarning(true);
    };
    const handleDelelteSubmit = async (trip_id: string, list_seat: string) => {
        try {
            // console.log("log", trip_id, list_seat);
            setOpenWarning(false);
            setPageLoading(true);
            await removeBooking(trip_id, list_seat);
            setPageLoading(false);
            socket.emit("changeSeats", { info: "changeSeats" });
        } catch (error: any) {
            setPageLoading(false);
            const msg = getErrorMessage(error);
            toast.error(msg ?? "Có lỗi xảy ra");
        }
    };
    const handleChooseSwapSeat = async (seat: number) => {
        try {
            // setOpenSnack(false);
            toast.dismiss();
            setSelectedSeatsBooked([]);
            setPageLoading(true);
            await updateSeat(seat, swapId);
            setPageLoading(false);
            setSwapId("");
            setSingleSelectMode(false);
            setSwapSeat(-1);
            toast.success("Đổi chỗ thành công");

            socket.emit("changeSeats", { info: "changeSeats" });
        } catch (error: any) {
            setPageLoading(false);

            const msg = getErrorMessage(error);
            toast.error(msg ?? "Có lỗi xảy ra");
        }
    };
    async function handleBookSubmit(data: IBookingForm) {
        try {
            setPageLoading(true);
            await addBooking(data);

            setPageLoading(false);
            setShowBookingForm(false);
            setSelectedSeats([]);
            // setSnackData({
            //     content: "Đặt thành công",
            //     typeAlert: "success",
            //     openInit: true,
            // });
            // setOpenSnack(true);
            console.log("Submit add");
            // socket-io
            socket.emit("changeSeats", { info: "changeSeats" });
            toast.success("Đặt thành công");
        } catch (error: any) {
            setPageLoading(false);
            setVisibleAlertText(true);
            const msg = getErrorMessage(error);
            toast.error(msg ?? "Có lỗi xảy ra");
            // setAlertText(error?.response.data.message ?? "Có lỗi xảy ra");
        }
    }
    async function handleBookUpdateSubmit(data: IBookingUpdateForm) {
        try {
            setPageLoading(true);
            await updateBooking(data);
            setPageLoading(false);
            setShowBookingUpdateForm(false);
            setSelectedSeatsBooked([]);
            // socket-io
            socket.emit("changeSeats", { info: "changeSeats" });
            toast.success("Cập nhật thành công");
        } catch (error: any) {
            console.log("update error", error);

            setPageLoading(false);
            // setVisibleAlertText(true);
            // setAlertText(error?.response.data.message ?? "Có lỗi xảy ra");
            const msg = getErrorMessage(error);
            toast.error(msg ?? "Có lỗi xảy ra");
        }
    }
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };
    // const configPoint: SWRConfiguration = {
    //     dedupingInterval: 60 * 60 * 1000,
    //     revalidateOnMount: true,
    //     revalidateOnFocus: false,
    // };
    const listProvince = useSWR<Array<NameValue> | [], Error>(
        `/locations/options`,
        null,
        config
    );

    // const listDropoffAndPickUp = useSWR<
    //     { pickup: Array<NameValue>; dropoff: Array<NameValue> },
    //     Error
    // >([`/locations/points/${watchRoute}`], null, configPoint);
    let listDropoffAndPickUp;
    if (watchRoute == "1-2") {
        listDropoffAndPickUp = Route12;
    } else {
        listDropoffAndPickUp = Route21;
    }
    //console.log("Render count: ", countRender++);

    // socket.on("change_data_seat", () => {
    //     console.log("got change");
    //     mutate();
    //     // setChange([...change, data.info]);
    // });
    let countMutate = 0;
    socket.on("changeData", () => {
        console.log("got change");
        if (countMutate == 0) {
            mutate();
        }
        // setChange([...change, data.info]);
    });
    console.log("render: ", count++);
    useEffect(() => {
        if (selectedTripId && listBooking) {
            setSelectedTrip(
                listBooking!.find((item) => item._id === selectedTripId)!
            );
        }
    }, [selectedTripId, listBooking]);

    return (
        <>
            <Head>
                <title>Đặt vé xe</title>
            </Head>
            {/* {isPageLoading && <LoadingPage />} */}
            <PageTitleWrapper>
                {/* <Button onClick={handleSocket}>Connect</Button> */}
                <Container maxWidth="lg">
                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleSearchSubmit)}
                    >
                        <Grid container spacing={1} columns={18}>
                            <Grid
                                item
                                xs={18}
                                sm={4}
                                // sx={{
                                //     paddingLeft: "20px",
                                //     width: "100%",
                                // }}
                            >
                                <SelectFieldNormal
                                    allOptions={[
                                        {
                                            name: "Hà Nội - Tuyên Quang",
                                            value: "1-2",
                                        },
                                        {
                                            name: "Tuyên Quang - Hà Nội",
                                            value: "2-1",
                                        },
                                    ]}
                                    control={control}
                                    label="Tuyến đường"
                                    // {...register("from_id")}
                                    name="route"
                                />
                            </Grid>
                            <Grid item xs={18} sm={4}>
                                <DatePickerField
                                    disablePast={true}
                                    control={control}
                                    label="Ngày"
                                    // {...register("from_id")}
                                    name="s_journey_date"
                                />
                            </Grid>
                            <Grid item xs={18} sm={4}>
                                <SelectFieldNormal
                                    allOptions={listDropoffAndPickUp.pickup}
                                    control={control}
                                    label="Điểm đón"
                                    // {...register("from_id")}
                                    name="from_point"
                                />
                            </Grid>
                            <Grid item xs={18} sm={4}>
                                <SelectFieldNormal
                                    allOptions={listDropoffAndPickUp.dropoff}
                                    control={control}
                                    label="Điểm trả"
                                    // {...register("from_id")}
                                    name="to_point"
                                />
                            </Grid>

                            <Grid item xs={18} sm={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    Tìm kiếm
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </PageTitleWrapper>

            {showBookingForm && (
                <BookForm
                    openBookForm={showBookingForm}
                    onClose={handleClose}
                    visibleAlertText={visibleAlertText}
                    alertText={alertText}
                    onBook={handleBookSubmit}
                    onCancel={() => {
                        setShowBookingForm(false);
                        setVisibleAlertText(false);
                        setAlertText("");
                    }}
                    configProvince={listProvince.data!}
                    tripDetail={selectedTrip}
                    selectedSeats={selectedSeats.join("-")}
                    s_journey_date={journeyDate}
                />
            )}

            {showBookingUpdateForm && (
                <BookUpdateForm
                    openBookForm={showBookingUpdateForm}
                    onClose={handleClose2}
                    visibleAlertText={visibleAlertText}
                    alertText={alertText}
                    list_id={listIdBooking}
                    book_detail={bookingData}
                    updateBooking={handleBookUpdateSubmit}
                    onCancel={() => {
                        setShowBookingUpdateForm(false);
                        setVisibleAlertText(false);
                        setAlertText("");
                    }}
                    configProvince={listProvince.data!}
                    tripDetail={selectedTrip}
                    selectedSeats={selectedSeatsBooked.join("-")}
                    s_journey_date={journeyDate}
                    handleClickDelete={handleClickDelete}
                />
            )}

            <Dialog open={openWarning} keepMounted sx={{ zIndex: 200 }}>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h4">Thông báo</Typography>
                </DialogTitle>
                <DialogContent sx={{ height: "60px", width: "400px" }}>
                    <DialogContentText id="alert-dialog-description">
                        Có chắc muốn huỷ vé không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleDelelteSubmit(
                                selectedTrip.trip_id,
                                selectedSeatsBooked.join("-")
                            );
                        }}
                        autoFocus
                        variant="contained"
                    >
                        Đồng ý
                    </Button>
                    <Button
                        onClick={() => setOpenWarning(false)}
                        variant="outlined"
                        color="warning"
                    >
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>
            {isLoading || listProvince.isLoading || isPageLoading ? (
                <CircularProgress />
            ) : (
                showListTrip && (
                    <TableListBooking
                        listProvince={
                            !listProvince.data ? [] : listProvince.data
                        }
                        // listTrips={listTrips}
                        listBooking={listBooking}
                        handleClickToTrip={handleClickToTrip}
                    />
                )
            )}

            {isLoading || listProvince.isLoading || isPageLoading ? (
                <CircularProgress />
            ) : (
                !showListTrip && (
                    <TripDetail
                        setSwapSeat={setSwapSeat}
                        swapSeat={swapSeat}
                        setSwapId={setSwapId}
                        handleChooseSwapSeat={handleChooseSwapSeat}
                        handleSwapClick={handleSwapClick}
                        journeyDate={journeyDate}
                        listProvince={
                            !listProvince.data ? [] : listProvince.data
                        }
                        tripDetail={selectedTrip}
                        handleAddClick={handleAddClick}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        setShowListTrip={setShowListTrip}
                        selectedSeatsBooked={selectedSeatsBooked}
                        setSelectedSeatsBooked={setSelectedSeatsBooked}
                        listDropoffAndPickUp={listDropoffAndPickUp}
                        handleUpdateClick={handleUpdateClick}
                        setSingleSelectMode={setSingleSelectMode}
                        singleSelectMode={singleSelectMode}
                    />
                )
            )}
        </>
    );
};

AdminBooking.Layout = SidebarLayout;

export default AdminBooking;
