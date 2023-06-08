// import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import {
    Button,
    // Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import AdminLayout from "@/components/layout/admin";
import { TableListBooking } from "@/components/booking/table-list-booking";
import { InputField, SelectFieldNormal } from "@/components/form";
import { IFilterTrip } from "@/models/Trips/trip-filter";
import { useForm } from "react-hook-form";
import { convertDateToString } from "@/utils";
import TripDetail from "@/components/booking/trip-detail";
import { BookForm, BookUpdateForm } from "@/components/booking";
import { useBooking } from "@/hooks/useBooking";
import IBookingTrip, { ISeatDetail } from "@/models/Book/book-trip";
import LoadingPage from "@/components/common/loading";
import { AlertContentProp, SnackAlert } from "@/components/common";

let countRender = 0;
const AdminTrips: NextpageWithLayout = () => {
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
    const [openSnack, setOpenSnack] = useState(false);
    const [snackData, setSnackData] = useState({
        content: "",
        typeAlert: "info",
        openInit: false,
    } as AlertContentProp);
    const [swapId, setSwapId] = useState("");
    const [alertText, setAlertText] = useState("");
    const [visiblealertText, setVisibleAlertText] = useState(false);
    const [bookingData, setBookingData] = useState({} as ISeatDetail);
    const [showListTrip, setShowListTrip] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([] as Array<number>);
    const [selectedSeatsBooked, setSelectedSeatsBooked] = useState(
        [] as Array<number>
    );
    const [swapSeat, setSwapSeat] = useState(-1);
    const [singleSelectMode, setSingleSelectMode] = useState(false);
    // const { listTrips } = useTrip(queryParams);
    const {
        listBooking,
        addBooking,
        updateBooking,
        updateSeat,
        removeBooking,
        isLoading,
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
        console.log(data);
        let params = `/search?route=${data.route}&journey_date=${data.s_journey_date}&pickup_point=${data.from_point}&dropoff_point=${data.to_point}`;

        setQueryParams(params);
        setJourneyDate(data.s_journey_date);
        setShowListTrip(true);
        setSelectedTrip({} as IBookingTrip);
        setSelectedTripID("");
    };

    const handleAddClick = () => {
        setOpenSnack(false);
        setShowBookingForm(true);
    };
    const handleUpdateClick = async () => {
        setOpenSnack(false);
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

        console.log(seat_number);
        if (book_detail) {
            setBookingData(book_detail);
            setListIdBooking(listId);
            setShowBookingUpdateForm(true);
        }
    };
    const handleSwapClick = () => {
        setSingleSelectMode(true);
        setSnackData({
            content: "Vui lòng chọn chỗ muốn đổi",
            typeAlert: "info",
            openInit: true,
        });
        setOpenSnack(true);
    };
    const handleClickDelete = () => {
        setOpenWarning(true);
    };
    const handleDelelteSubmit = async (trip_id: string, list_seat: string) => {
        try {
            console.log("log", trip_id, list_seat);
            setOpenWarning(false);
            setPageLoading(true);
            await removeBooking(trip_id, list_seat);
            setPageLoading(false);
        } catch (error: any) {
            setPageLoading(false);
            setSnackData({
                content: error?.response.data.message ?? "Có lỗi xảy ra",
                typeAlert: "error",
                openInit: true,
            });
            setOpenSnack(true);
        }
    };
    const handleChooseSwapSeat = async (seat: number) => {
        try {
            setOpenSnack(false);
            setSelectedSeatsBooked([]);
            setPageLoading(true);
            await updateSeat(seat, swapId);
            setPageLoading(false);
            setSwapId("");
            setSingleSelectMode(false);
            setSwapSeat(-1);
            setSnackData({
                content: "Đổi chỗ thành công",
                typeAlert: "success",
                openInit: true,
            });
            setOpenSnack(true);
        } catch (error: any) {
            setPageLoading(false);
            setSnackData({
                content: error?.response.data.message ?? "Có lỗi xảy ra",
                typeAlert: "error",
                openInit: true,
            });
            setOpenSnack(true);
        }
    };
    async function handleBookSubmit(data: IBookingForm) {
        try {
            setPageLoading(true);
            await addBooking(data);

            setPageLoading(false);
            setShowBookingForm(false);
            setSelectedSeats([]);
            setSnackData({
                content: "Đặt thành công",
                typeAlert: "success",
                openInit: true,
            });
            setOpenSnack(true);
        } catch (error: any) {
            setPageLoading(false);
            setVisibleAlertText(true);
            setAlertText(error?.response.data.message ?? "Có lỗi xảy ra");
        }
    }
    async function handleBookUpdateSubmit(data: IBookingUpdateForm) {
        try {
            setPageLoading(true);
            await updateBooking(data);
            setPageLoading(false);
            setShowBookingUpdateForm(false);
            setSelectedSeatsBooked([]);
            setSnackData({
                content: "Cập nhật thành công",
                typeAlert: "success",
                openInit: true,
            });
            setOpenSnack(true);
        } catch (error: any) {
            console.log("update error", error);

            setPageLoading(false);
            setVisibleAlertText(true);
            setAlertText(error?.response.data.message ?? "Có lỗi xảy ra");
        }
    }
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };
    const configPoint: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };
    const listProvince = useSWR<Array<NameValue> | [], Error>(
        `/admin/locations/options`,
        null,
        config
    );
    const watchRoute = watch("route", "1-2");
    const listDropoffAndPickUp = useSWR<
        { pickup: Array<NameValue>; dropoff: Array<NameValue> },
        Error
    >([`/admin/locations/points/${watchRoute}`], null, configPoint);

    console.log("Render count: ", countRender++);

    useEffect(() => {
        if (selectedTripId && listBooking) {
            setSelectedTrip(
                listBooking!.find((item) => item._id === selectedTripId)!
            );
        }
    }, [selectedTripId, listBooking]);

    if (
        isLoading ||
        !listDropoffAndPickUp.data ||
        !listProvince.data ||
        !listBooking
    ) {
        return <LoadingPage />;
    }
    return (
        <Box p={2}>
            {isPageLoading && <LoadingPage />}

            {openSnack && (
                <SnackAlert
                    openInit={true}
                    content={snackData.content}
                    typeAlert={snackData.typeAlert}
                />
            )}
            <Box
                component="form"
                onSubmit={handleSubmit(handleSearchSubmit)}
                sx={{
                    display: "flex",
                    justifyItems: "center",
                }}
            >
                <Box
                    sx={{
                        paddingLeft: "20px",
                        width: "100%",
                    }}
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
                </Box>
                <Box
                    sx={{
                        paddingLeft: "20px",
                        width: "100%",
                    }}
                >
                    <InputField
                        type="date"
                        control={control}
                        label="Ngày"
                        // {...register("from_id")}
                        name="s_journey_date"
                    />
                </Box>
                <Box
                    sx={{
                        paddingLeft: "20px",
                        width: "100%",
                    }}
                >
                    <SelectFieldNormal
                        allOptions={
                            listDropoffAndPickUp.data === undefined
                                ? []
                                : listDropoffAndPickUp.data.pickup
                        }
                        control={control}
                        label="Điểm đón"
                        // {...register("from_id")}
                        name="from_point"
                    />
                </Box>
                <Box
                    sx={{
                        paddingLeft: "20px",
                        width: "100%",
                    }}
                >
                    <SelectFieldNormal
                        allOptions={
                            listDropoffAndPickUp.data === undefined
                                ? []
                                : listDropoffAndPickUp.data.dropoff
                        }
                        control={control}
                        label="Điểm trả"
                        // {...register("from_id")}
                        name="to_point"
                    />
                </Box>

                <Box
                    sx={{
                        paddingLeft: "20px",
                        width: "100%",
                        alignSelf: "center",
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            padding: "normal",
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Box>
            </Box>

            <Dialog
                open={showBookingForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose}
                aria-labelledby="add-booking"
                aria-describedby="add-booking"
            >
                <BookForm
                    visiblealertText={visiblealertText}
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
            </Dialog>

            <Dialog
                open={showBookingUpdateForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose2}
                aria-labelledby="update-booked-seats"
                aria-describedby="update-booked-seats"
                sx={{ zIndex: 100 }}
            >
                <BookUpdateForm
                    visiblealertText={visiblealertText}
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
            </Dialog>
            <Dialog open={openWarning} keepMounted sx={{ zIndex: 200 }}>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h4">Thông báo</Typography>
                </DialogTitle>
                <DialogContent sx={{ height: "60px", width: "400px" }}>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="h5">
                            Có chắc muốn huỷ vé không?
                        </Typography>
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
            {showListTrip && (
                <TableListBooking
                    listProvince={!listProvince.data ? [] : listProvince.data}
                    // listTrips={listTrips}
                    listBooking={listBooking}
                    handleClickToTrip={handleClickToTrip}
                />
            )}
            {!showListTrip && (
                <TripDetail
                    setSwapSeat={setSwapSeat}
                    swapSeat={swapSeat}
                    setSwapId={setSwapId}
                    handleChooseSwapSeat={handleChooseSwapSeat}
                    handleSwapClick={handleSwapClick}
                    journeyDate={journeyDate}
                    listProvince={!listProvince.data ? [] : listProvince.data}
                    tripDetail={selectedTrip}
                    handleAddClick={handleAddClick}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    setShowListTrip={setShowListTrip}
                    selectedSeatsBooked={selectedSeatsBooked}
                    setSelectedSeatsBooked={setSelectedSeatsBooked}
                    listDropoffAndPickUp={
                        !listDropoffAndPickUp.data
                            ? { pickup: [], dropoff: [] }
                            : listDropoffAndPickUp.data
                    }
                    handleUpdateClick={handleUpdateClick}
                    setSingleSelectMode={setSingleSelectMode}
                    singleSelectMode={singleSelectMode}
                />
            )}
        </Box>
    );
};

AdminTrips.Layout = AdminLayout;

export default AdminTrips;
