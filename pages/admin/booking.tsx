// import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import {
    Button,
    // Typography,
    Dialog,
} from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
// import { useTrip } from "@/hooks";
import { IBookingForm, NameValue, NextpageWithLayout } from "@/models";
import React, { useState } from "react";

// import { locationApi } from "@/api-client";
import useSWR, { SWRConfiguration } from "swr";
import AdminLayout from "@/components/layout/admin";
import { TableListBooking } from "@/components/booking/table-list-booking";
import { InputField, SelectFieldNormal } from "@/components/form";
import { IFilterTrip } from "@/models/Trips/trip-filter";
import { useForm } from "react-hook-form";
import { convertDateToString } from "@/utils";
import TripDetail from "@/components/booking/trip-detail";
import { BookForm } from "@/components/booking";
import { useBooking } from "@/hooks/useBooking";
import IBookingTrip from "@/models/Book/book-trip";

let countRender = 0;
const AdminTrips: NextpageWithLayout = () => {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<IBookingTrip>(
        {} as IBookingTrip
    );
    const [showCarUpdateForm, setShowTripUpdateForm] = useState(false);
    const [queryParams, setQueryParams] = useState("");
    const [journeyDate, setJourneyDate] = useState(
        convertDateToString(new Date())
    );
    const [showListTrip, setShowListTrip] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([] as Array<number>);
    const [selectedSeatsBooked, setSelectedSeatsBooked] = useState(
        [] as Array<number>
    );
    // const { listTrips } = useTrip(queryParams);
    const { listBooking, addBooking } = useBooking(queryParams);
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
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowTripUpdateForm(false);
    };
    const handleClickToTrip = (data: IBookingTrip) => {
        setSelectedTrip(data);
        setShowListTrip(false);
    };

    const handleSearchSubmit = (data: IFilterTrip) => {
        console.log(data);
        let params = `/search?route=${data.route}&journey_date=${data.s_journey_date}&pickup_point=${data.from_point}&dropoff_point=${data.to_point}`;

        setQueryParams(params);
        setJourneyDate(data.s_journey_date);
        setShowListTrip(true);
    };

    const handleAddClick = () => {
        setShowBookingForm(true);
    };

    async function handleBookSubmit(data: IBookingForm) {
        try {
            await addBooking(data);
            setShowBookingForm(false);
            setSelectedSeats([]);
            setShowListTrip(true);
            // setSelectedTrip(
            //     listBooking?.find((booking) => {
            //         booking._id === selectedTrip._id;
            //     })!
            // );
        } catch (error) {
            console.log("Add error", error);
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

    return (
        <Box p={2}>
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
                        margin: "10px",
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
                        margin: "10px",
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
                        margin: "10px",
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
                        margin: "10px",
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
                        margin: "10px",
                        width: "100%",
                        alignSelf: "center",
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: "normal",
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
                aria-labelledby="add-trip"
                aria-describedby="add-trip"
            >
                <BookForm
                    onBook={handleBookSubmit}
                    onCancel={() => setShowBookingForm(false)}
                    configProvince={listProvince.data!}
                    tripDetail={selectedTrip}
                    selectedSeats={selectedSeats.join("-")}
                    s_journey_date={journeyDate}
                />
            </Dialog>
            <Dialog
                open={showCarUpdateForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose2}
                aria-labelledby="update-trip"
                aria-describedby="update-trip"
            ></Dialog>

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
                />
            )}
        </Box>
    );
};

AdminTrips.Layout = AdminLayout;

export default AdminTrips;
