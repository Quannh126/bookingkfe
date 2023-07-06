import MainLayout from "@/components/layout/main";

import { Box } from "@mui/system";
// import { Stack } from "@mui/material";
// import { useRouter } from 'next/router'
import { IBookingForm, NextpageWithLayout } from "../models";
// import { Popular } from "@/components/home";
// import { useBooking } from "@/hooks/useBooking";
import React, { createContext } from "react";
import { convertDateToString } from "@/utils";
// import IBookingTrip from "@/models/Book/book-trip";
import { IFilterTrip } from "@/models/Trips/trip-filter";
import { useForm } from "react-hook-form";
// import LoadingPage from "@/components/common/loading";
import {
    Button,
    Container,
    // Grid,
    // Paper,
    // PaperProps,
    // Typography,
} from "@mui/material";
import {
    DatePickerField,
    // InputField,
    // SelectFieldNormal,
} from "@/components/form";
// import { styled } from "@mui/material/styles";
// import useSWR, { SWRConfiguration } from "swr";

// import ListBooking from "@/components/home/list_trip_booking";
// import { useDispatch } from "react-redux";
// import { resetSeletedTrip, setSelectedTrip } from "@/redux/selectedTrip";

// const SearchWrapper = styled(Paper)<PaperProps>(
//     ({ theme }) => `
//     background-color: ${theme.colors.primary.lighter};
//   `
// );
// eslint-disable-next-line no-unused-vars
type FunctionType = (data: IBookingForm) => void;
interface BookContextType {
    addBooking: FunctionType;
}
export const MyContext = createContext<BookContextType>({
    addBooking: () => {},
});
const Coach: NextpageWithLayout = () => {
    // const [queryParams, setQueryParams] = useState("");
    //const [route, setRoute] = useState("1-2");

    // const { listBooking, addBooking, isLoading } = useBooking(queryParams);

    const {
        // register,
        control,

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

    return (
        <Box component="section">
            <Container
                sx={{
                    mt: 4,
                }}
            >
                <Box
                    component="form"
                    onSubmit={() => {
                        console.log("ok");
                    }}
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
                        <DatePickerField
                            disablePast={true}
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
            </Container>
        </Box>
    );
};

Coach.Layout = MainLayout;

export default Coach;
