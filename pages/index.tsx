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
const Home: NextpageWithLayout = () => {
    const [queryParams, setQueryParams] = useState("");
    //const [route, setRoute] = useState("1-2");
    const dispatch = useDispatch();
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
        reValidateMode: "onSubmit",
    });
    const route = watch("route", "1-2");
    const handleSearchSubmit = (data: IFilterTrip) => {
        setSelectedTrip({} as IBookingTrip);

        //setRoute(watchRoute);
        let params = `/search?route=${data.route}&journey_date=${data.s_journey_date}&pickup_point=${data.from_point}&dropoff_point=${data.to_point}`;
        setQueryParams(params);
        dispatch(resetSeletedTrip());
    };
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };

    // const fetcherlistProvince = async (url: string): Promise<NameValue[]> => {
    //     // const response = await fetch(url);
    //     // const data = await response.json();
    //     // const weatherData: WeatherData[] = data.map((item: any) => ({
    //     //     date: item.date,
    //     //     temperature: item.main.temp,
    //     //     description: item.weather[0].description,
    //     // }));
    //     // return weatherData;
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     console.log("data: ", data);
    //     return data;
    // };
    const listProvince = useSWR<Array<NameValue> | [], Error>(
        `/admin/locations/options`,
        null,
        config
    );

    // const listDropoffAndPickUp = useSWR<
    //     { pickup: Array<NameValue>; dropoff: Array<NameValue> },
    //     Error
    // >([`/admin/locations/points/${route}`], null, configPoint);

    let listDropoffAndPickUp = {};
    if (route === "1-2") {
        listDropoffAndPickUp = {
            "dropoff": [
                {
                    "name": "-Tất cả-",
                    "value": "",
                },
                {
                    "value": "1-1",
                    "name": "Hàm Yên-Bến xe Tuyên Quang",
                },
                {
                    "value": "1-2",
                    "name": "Hàm Yên-Tràng Đà",
                },
                {
                    "value": "1-3",
                    "name": "Hàm Yên-Xuân Vân",
                },
                {
                    "value": "2-1",
                    "name": "Tuyên Quang-Bến xe Tuyên Quang",
                },
                {
                    "value": "3-1",
                    "name": "Na Hang-Na Hang",
                },
                {
                    "value": "4-1",
                    "name": "Chiêm Hóa-Chiêm Hoá",
                },
            ],
            "pickup": [
                {
                    "name": "-Tất cả-",
                    "value": "",
                },
                {
                    "value": "1-1",
                    "name": "Cầu giấy-BigC Thăng Long",
                },
                {
                    "value": "1-2",
                    "name": "Cầu giấy-Đại học Ngoại Ngữ",
                },
                {
                    "value": "2-1",
                    "name": "Thanh Xuân-Số 35 Nguyễn Tuân",
                },
                {
                    "value": "2-2",
                    "name": "Thanh Xuân-Khu đô thị Royal City",
                },
                {
                    "value": "2-3",
                    "name": "Thanh Xuân-Ngõ 90 Nguyễn Tuân",
                },
                {
                    "value": "2-4",
                    "name": "Thanh Xuân-Số 378 đường Nguyễn Trãi",
                },
                {
                    "value": "3-1",
                    "name": "Nam Từ Liêm-Bến xe Mỹ Đình",
                },
            ],
        };
    } else {
        listDropoffAndPickUp = {
            "dropoff": [
                {
                    "name": "-Tất cả-",
                    "value": "",
                },
                {
                    "value": "1-1",
                    "name": "Cầu giấy-BigC Thăng Long",
                },
                {
                    "value": "1-2",
                    "name": "Cầu giấy-Đại học Ngoại Ngữ",
                },
                {
                    "value": "2-1",
                    "name": "Thanh Xuân-Số 35 Nguyễn Tuân",
                },
                {
                    "value": "2-2",
                    "name": "Thanh Xuân-Khu đô thị Royal City",
                },
                {
                    "value": "2-3",
                    "name": "Thanh Xuân-Ngõ 90 Nguyễn Tuân",
                },
                {
                    "value": "2-4",
                    "name": "Thanh Xuân-Số 378 đường Nguyễn Trãi",
                },
                {
                    "value": "3-1",
                    "name": "Nam Từ Liêm-Bến xe Mỹ Đình",
                },
            ],
            "pickup": [
                {
                    "name": "-Tất cả-",
                    "value": "",
                },
                {
                    "value": "1-1",
                    "name": "Hàm Yên-Bến xe Tuyên Quang",
                },
                {
                    "value": "1-2",
                    "name": "Hàm Yên-Tràng Đà",
                },
                {
                    "value": "1-3",
                    "name": "Hàm Yên-Xuân Vân",
                },
                {
                    "value": "2-1",
                    "name": "Tuyên Quang-Bến xe Tuyên Quang",
                },
                {
                    "value": "3-1",
                    "name": "Na Hang-Na Hang",
                },
                {
                    "value": "4-1",
                    "name": "Chiêm Hóa-Chiêm Hoá",
                },
            ],
        };
    }

    if (isLoading || !listProvince.data || !listBooking) {
        return <LoadingPage />;
    } else {
        const listCapacity = listBooking
            .map((item) => item.car.capacity)
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        localStorage.setItem("listCapacity", JSON.stringify(listCapacity));

        localStorage.setItem(
            "listDropoffAndPickUp",
            JSON.stringify(listDropoffAndPickUp)
        );
    }
    return (
        <Box component="section">
            {/* {isPageLoading && <LoadingPage />} */}

            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: -1,
                    WebkitTapHighlightColor: "transparent",
                }}
            >
                <Box
                    component="img"
                    sx={{
                        height: 600,
                        width: "100%",
                    }}
                    src="/img/background.jpg"
                ></Box>
            </Box>

            <Box
                component="h2"
                sx={{
                    textAlign: "center",
                    zIndex: -2,
                }}
            >
                Online Booking. Save Time and Money!
            </Box>
            <Container>
                <SearchWrapper
                    elevation={2}
                    sx={{
                        mx: "auto",
                        p: 4,
                        textAlign: "center",
                    }}
                >
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
                        {/* <Box
                            sx={{
                                paddingLeft: "20px",
                                width: "100%",
                            }}
                        >
                            <SelectFieldNormal
                                // isLoading={!listDropoffAndPickUp.data}
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
                                // isLoading={!listDropoffAndPickUp.data}
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
                        </Box> */}

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
                </SearchWrapper>
            </Container>

            <Popular />
            <Container>
                <Grid container spacing={2}>
                    <Typography variant="h3">Danh cho quang cao</Typography>
                </Grid>
            </Container>
            <Container>
                <Grid container>
                    <Grid xs={12} md={3} item sx={{ paddingRight: "12px" }}>
                        <Paper sx={{ height: "500px" }}></Paper>
                    </Grid>
                    <Grid xs={12} md={9} item>
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

Home.Layout = MainLayout;

export default Home;
