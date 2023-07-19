// import MainLayout from "@/components/layout/main";
// import { NextPageContext } from "next";
import { Box } from "@mui/system";
// import { Stack } from "@mui/material";
// import { useRouter } from 'next/router'
import {
    IBookingForm,
    NameValue,
    NextpageWithLayout,
    ILocationGrouped,
} from "../models";
// import { Popular } from "@/components/home";
// import { useBooking } from "@/hooks/useBooking";
import React, { createContext, useState } from "react";
import {
    // Button,
    Card,
    CardContent,
    CardProps,
    // CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Select,
    Typography,
    styled,
} from "@mui/material";
// import LoadingPage from "@/components/common/loading";

import ListBooking from "@/components/home/list_trip_booking";
import { useRouter } from "next/router";
import { CreateURLPayment, useCoach } from "@/hooks";
// import LoadingPage from "@/components/common/loading";
// import { Route12, Route21 } from "@/config/routes";
import Head from "next/head";
import BaseLayout from "@/components/layout/BaseLayout";
import Logo from "@/components/Logo";

import useSWR, { SWRConfiguration } from "swr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import Router from "next/router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

import { PureLightTheme } from "@/utils";
import FilterCard from "@/components/home/filter";
import { useSelector, useDispatch } from "react-redux";
import {
    setFilterSL,
    setFilterEL,
    setFilterJD,
    selectFilterState,
} from "@/redux/selectedFilter";
import { Skeleton } from "@mui/material";
import SkeletonListCoach from "@/components/home/SkeletonListCoach";
// import dynamic from "next/dynamic";
// eslint-disable-next-line no-unused-vars
type FunctionType = (data: IBookingForm) => any;
// eslint-disable-next-line no-unused-vars
type FunctionType2 = (data: CreateURLPayment) => void;
interface BookContextType {
    addBooking: FunctionType;
    createURL: FunctionType2;
}
const today = moment();
export const MyContext = createContext<BookContextType>({
    addBooking: () => {},
    createURL: () => {},
});
export type FormDataState = {
    startLocation: string;
    endLocation: string;
    journeyDate: string;
    gn: boolean;
    gt: boolean;
    times: string;
    avSeat: number;
};
const HeaderWrapper = styled(Card)(
    ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(2)};
  `
);
// const OverviewWrapper = styled(Box)(
//     ({ theme }) => `
//       overflow: auto;
//       flex: 1;
//       overflow-x: hidden;
//   `
// );

const SearchWrapper = styled(Card)<CardProps>(
    ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
  `
);

// let renderCount = 0;

const Coach: NextpageWithLayout = () => {
    // const [locations, setLocations] = useState<ILocationGrouped[]>([]);
    const formState = useSelector(selectFilterState);
    const dispatch = useDispatch();
    const router = useRouter();
    // http://localhost:3000/coaches?startLocation=&endLocation=&journeyDate=2023-07-09
    // console.log(router.query)
    const { startLocation, endLocation, journeyDate, times, gn, gt, avSeat } =
        formState;
    // const [checked, setChecked] = React.useState([
    //     carType === "Giường nằm",
    //     carType === "Ghế ngồi",
    // ]);
    //console.log(formState);
    const [formData, setFormData] = useState<FormDataState>({
        startLocation: startLocation?.toString() ?? "",
        endLocation: endLocation?.toString() ?? "",
        journeyDate:
            moment(journeyDate).format("YYYY-MM-DD") ??
            today.format("YYYY-MM-DD"),
        times: times?.toString() ?? "",
        gn: gn ?? false,
        gt: gt ?? false,
        avSeat: avSeat ?? 0,
    });

    let route;
    if (!startLocation || !endLocation) {
        route = "1-2";
    } else {
        const startList = formData.startLocation.toString()!.split("-");
        const endList = formData.endLocation.toString()!.split("-");
        route = startList[0] + "-" + endList[0];
    }

    const locationFrom = route === "1-2" ? "Hà Nội" : "Tuyên Quang";
    const locationTo = route === "2-1" ? "Tuyên Quang" : "Hà Nội";
    const queryParams = `?startLocation=${startLocation}&endLocation=${endLocation}&journey_date=${journeyDate}&times=${times}&gn=${gn}&gt=${gt}&available_seat=${avSeat}`;
    const {
        listCoach,
        isLoading: isLoadingHook,
        addBooking,
        createURL,
        mutate,
    } = useCoach(queryParams, router.isReady);

    const onChangeFrom = (val: any) => {
        // console.log(val.target.value);
        setFormData({ ...formData, ...{ startLocation: val.target.value } });
        // checkButtonDisabled();
        dispatch(setFilterSL(val.target.value));
    };
    const onChangeTo = (val: any) => {
        console.log(val.target.value);
        setFormData({ ...formData, ...{ endLocation: val.target.value } });
        // checkButtonDisabled();
        dispatch(setFilterEL(val.target.value));
    };

    const onChangeDate = (val: any) => {
        //console.log(val._d);
        const journeyDate = val && moment(val._d).format("YYYY-MM-DD");
        setFormData({ ...formData, ...{ journeyDate } });
        // checkButtonDisabled();
        dispatch(setFilterJD(journeyDate));
    };
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };

    const { data: locations, isLoading } = useSWR<
        Array<ILocationGrouped> | [],
        Error
    >(`/locations/group-options`, null, config);

    const { data: listDropoffAndPickUp, isLoading: isLoadingConfig } = useSWR<
        {
            pickup: NameValue[];
            dropoff: NameValue[];
        },
        Error
    >(router.isReady ? `/locations/points/${route}` : null, null, config);
    if (!isLoadingConfig && listDropoffAndPickUp) {
        localStorage.setItem(
            "listDropoffAndPickUp",
            JSON.stringify(listDropoffAndPickUp)
        );
    }
    // const ListBooking = dynamic(
    //     () => import("@/components/home/list_trip_booking"),
    //     {
    //         loading: () => (
    //             <Skeleton
    //                 variant="rectangular"
    //                 width="100%"
    //                 height={PureLightTheme.spacing(10)}
    //             />
    //         ),
    //     }
    // );
    // if (!router.isReady) {
    //     return <LoadingPage />;
    // }
    return (
        <Box
            sx={{
                overflow: "auto",
                flex: 1,
                overflowX: "hidden",
            }}
        >
            <Head>
                <title>{`Đặt vé từ ${locationFrom} đến ${locationTo}`}</title>
            </Head>
            <HeaderWrapper>
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center">
                        <Logo />
                    </Box>
                </Container>
            </HeaderWrapper>

            <Container maxWidth="lg">
                <SearchWrapper elevation={2}>
                    <CardContent sx={{ padding: PureLightTheme.spacing(2) }}>
                        {isLoading || !locations || locations === undefined ? (
                            <Grid
                                container
                                spacing={1}
                                sx={
                                    {
                                        // paddingBottom: PureLightTheme.spacing(2),
                                    }
                                }
                            >
                                <Grid item xs={12} md={4}>
                                    <Skeleton
                                        height="1.4375em"
                                        sx={{
                                            padding: "16.5px 14px",
                                            display: "block",
                                            borderRadius: "10px",
                                            boxSizing: "content-box",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Skeleton
                                        height="1.4375em"
                                        sx={{
                                            padding: "16.5px 14px",
                                            display: "block",
                                            borderRadius: "10px",
                                            boxSizing: "content-box",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Skeleton
                                        height="1.4375em"
                                        sx={{
                                            padding: "16.5px 14px",
                                            display: "block",
                                            borderRadius: "10px",
                                            boxSizing: "content-box",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid
                                container
                                spacing={1}
                                sx={
                                    {
                                        // paddingBottom: PureLightTheme.spacing(2),
                                    }
                                }
                            >
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            htmlFor="select_from"
                                            id="select_from"
                                        >
                                            Điểm đi
                                        </InputLabel>
                                        <Select
                                            native
                                            id="select_from"
                                            label="from"
                                            // size="small"
                                            defaultValue={startLocation}
                                            fullWidth
                                            onChange={onChangeFrom}
                                            // onFocus={onFocus}
                                            // onBlur={onBlur}
                                        >
                                            <option
                                                aria-label="None"
                                                value=""
                                            />
                                            {locations.map((item, index) => {
                                                return (
                                                    <optgroup
                                                        label={item.header}
                                                        key={index}
                                                    >
                                                        {item.point.map(
                                                            (
                                                                item,
                                                                itemIndex
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    value={
                                                                        item.code_group
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </optgroup>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            htmlFor="select_to"
                                            id="select_to"
                                        >
                                            Điểm đến
                                        </InputLabel>
                                        <Select
                                            native
                                            id="select_to"
                                            label="to"
                                            fullWidth
                                            defaultValue={endLocation}
                                            // size="small"
                                            sx={{ width: "100%" }}
                                            onChange={onChangeTo}
                                            // onFocus={onFocus}
                                            // onBlur={onBlur}
                                        >
                                            <option
                                                aria-label="None"
                                                value=""
                                            />
                                            {locations!.map((item, index) => {
                                                return (
                                                    <optgroup
                                                        label={item.header}
                                                        key={index}
                                                    >
                                                        {item.point.map(
                                                            (
                                                                item,
                                                                itemIndex
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    value={
                                                                        item.code_group
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </optgroup>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterMoment}
                                    >
                                        <Box>
                                            <DatePicker
                                                disablePast
                                                defaultValue={moment(
                                                    journeyDate
                                                )}
                                                onChange={onChangeDate}
                                                sx={{ width: "100%" }}
                                                format="DD/MM/YYYY"
                                            />
                                        </Box>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        )}
                        {/* <Divider />
                        <InstructCard /> */}
                    </CardContent>
                </SearchWrapper>
            </Container>
            <Container maxWidth="lg">
                <Grid
                    spacing={2}
                    paddingTop={PureLightTheme.spacing(2)}
                    justifyContent="center"
                    alignItems="flex-start"
                    container
                >
                    <>
                        <Grid
                            item
                            xs={12}
                            md={2}
                            lg={4}
                            mx="auto"
                            marginBottom="auto"
                        >
                            <Card>
                                <CardContent
                                    sx={{
                                        padding: PureLightTheme.spacing(4),
                                    }}
                                >
                                    <FilterCard
                                        setFormData={setFormData}
                                        formData={formData}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        {!listCoach ||
                        isLoadingHook ||
                        isLoadingConfig ||
                        !listDropoffAndPickUp ? (
                            <Grid item xs={12} md={10} lg={8} mx="auto">
                                <SkeletonListCoach />
                            </Grid>
                        ) : (
                            <Grid item xs={12} md={10} lg={8} mx="auto">
                                {/* <SkeletonListCoach /> */}
                                {listCoach.length == 0 &&
                                !isLoadingHook &&
                                !isLoadingConfig ? (
                                    <Typography
                                        sx={{
                                            padding: PureLightTheme.spacing(3),
                                            justifyContent: "center",
                                        }}
                                        variant="h3"
                                    >
                                        Không tìm thấy chuyến nào !
                                    </Typography>
                                ) : (
                                    <MyContext.Provider
                                        value={{ addBooking, createURL }}
                                    >
                                        <ListBooking
                                            mutate={mutate}
                                            listData={listCoach}
                                            listDropoffAndPickUp={
                                                listDropoffAndPickUp
                                            }
                                            addBooking={addBooking}
                                            createURL={createURL}
                                        />
                                    </MyContext.Provider>
                                )}
                            </Grid>
                        )}
                    </>
                </Grid>
            </Container>
        </Box>
    );
};

Coach.Layout = BaseLayout;

export default Coach;
