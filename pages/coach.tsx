import MainLayout from "@/components/layout/main";

import { Box } from "@mui/system";
// import { Stack } from "@mui/material";
// import { useRouter } from 'next/router'
import { IBookingForm, NameValue, NextpageWithLayout } from "../models";
import { Popular } from "@/components/home";
import { useBooking } from "@/hooks/useBooking";
import React, { createContext, useState } from "react";
import { convertDateToString } from "@/utils";
import IBookingTrip from "@/models/Book/book-trip";
import { IFilterTrip } from "@/models/Trips/trip-filter";
import { useForm } from "react-hook-form";
import LoadingPage from "@/components/common/loading";
import {
    Button,
    Container,
    Grid,
    Paper,
    PaperProps,
    Typography,
} from "@mui/material";
import { InputField, SelectFieldNormal } from "@/components/form";
import { styled } from "@mui/material/styles";
import useSWR, { SWRConfiguration } from "swr";

import ListBooking from "@/components/home/list_trip_booking";
import { useDispatch } from "react-redux";
import { resetSeletedTrip, setSelectedTrip } from "@/redux/selectedTrip";
const SearchWrapper = styled(Paper)<PaperProps>(
    ({ theme }) => `
    background-color: ${theme.colors.primary.lighter};
  `
);
// eslint-disable-next-line no-unused-vars
type FunctionType = (data: IBookingForm) => void;
interface BookContextType {
    addBooking: FunctionType;
}
export const MyContext = createContext<BookContextType>({
    addBooking: () => {},
});
const Coach: NextpageWithLayout = () => {
    const [queryParams, setQueryParams] = useState("");
    //const [route, setRoute] = useState("1-2");

    const { listBooking, addBooking, isLoading } = useBooking(queryParams);

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
        // reValidateMode: "onSubmit",
    });
    const route = watch("route", "1-2");

    return (
        <Box component="section">
            <Container
                sx={{
                    mt: 4,
                }}
            >
                <Grid container>
                    <Typography variant="h3">Kết quả tìm kiếm </Typography>

                    <Grid xs={12} md={12} item>
                        <MyContext.Provider value={{ addBooking }}>
                            <ListBooking
                                listData={listBooking}
                                listDropoffAndPickUp={
                                    listDropoffAndPickUp as {
                                        pickup: NameValue[];
                                        dropoff: NameValue[];
                                    }
                                }
                                addBooking={addBooking}
                            />
                        </MyContext.Provider>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

Coach.Layout = MainLayout;

export default Coach;
