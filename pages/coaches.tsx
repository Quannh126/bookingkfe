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
    Button,
    Card,
    CardContent,
    CardProps,
    CircularProgress,
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
import LoadingPage from "@/components/common/loading";
// import { Route12, Route21 } from "@/config/routes";
import Head from "next/head";
import BaseLayout from "@/components/layout/BaseLayout";
import Logo from "@/components/Logo";

import useSWR, { SWRConfiguration } from "swr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Router from "next/router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

import { PureLightTheme } from "@/utils";
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
const HeaderWrapper = styled(Card)(
    ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(2)};
  `
);
const OverviewWrapper = styled(Box)(
    ({ theme }) => `
      overflow: auto;
      background: ${theme.palette.common.white};
      flex: 1;
      overflow-x: hidden;
  `
);

const SearchWrapper = styled(Card)<CardProps>(
    ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
  `
);
//let renderCount = 0;//

const Coach: NextpageWithLayout = () => {
    // const [locations, setLocations] = useState<ILocationGrouped[]>([]);

    const router = useRouter();
    // http://localhost:3000/coaches?startLocation=&endLocation=&journeyDate=2023-07-09
    // console.log(router.query)
    const { startLocation, endLocation, journeyDate } = router.query;
    const [formData, setFormData] = useState({
        startLocation: startLocation ?? "",
        endLocation: endLocation ?? "",
        journeyDate:
            moment(journeyDate).format("YYYY-MM-DD") ??
            today.format("YYYY-MM-DD"),
        capacity: "",
        carType: "",
    });
    let route, from_point, to_point;
    if (!startLocation || !endLocation) {
        route = "1-2";
        from_point = "";
        to_point = "";
    } else {
        const startList = formData.startLocation.toString()!.split("-");
        const endList = formData.endLocation.toString()!.split("-");
        route = startList[0] + "-" + endList[0];
        from_point = startList[1] + "-" + startList[2];
        to_point = endList[1] + "-" + endList[2];
    }
    const locationFrom = route === "1-2" ? "Hà Nội" : "Tuyên Quang";
    const locationTo = route === "2-1" ? "Tuyên Quang" : "Hà Nội";
    const queryParams = `?route=${route}&journey_date=${journeyDate}&pickup_point=${from_point}&dropoff_point=${to_point}&capacity=${formData.capacity}&car_type=${formData.carType}`;
    const {
        listCoach,
        isLoading: isLoadingHook,
        addBooking,
        createURL,
    } = useCoach(queryParams, router.isReady);

    const onClickSearch = () => {
        // console.log("Click search", formData);
        Router.push({
            pathname: "/coaches",
            query: formData,
        });
    };
    const onChangeFrom = (val: any) => {
        //console.log(val.target.value);
        setFormData({ ...formData, ...{ startLocation: val.target.value } });
        // checkButtonDisabled();
    };
    const onChangeTo = (val: any) => {
        //console.log(val.target.value);
        setFormData({ ...formData, ...{ endLocation: val.target.value } });
        // checkButtonDisabled();
    };
    const onChangeCapacity = (val: any) => {
        //console.log(val.target.value);
        setFormData({ ...formData, ...{ capacity: val.target.value } });
        // checkButtonDisabled();
    };
    const onChangeCarType = (val: any) => {
        //console.log(val.target.value);
        setFormData({ ...formData, ...{ carType: val.target.value } });
        // checkButtonDisabled();
    };

    const onChangeDate = (val: any) => {
        //console.log(val._d);
        const journeyDate = val && moment(val._d).format("YYYY-MM-DD");
        setFormData({ ...formData, ...{ journeyDate } });
        // checkButtonDisabled();
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

    // if (route == "1-2") {
    //     listDropoffAndPickUp = Route12;
    // } else {
    //     listDropoffAndPickUp = Route21;
    // }
    const { data: listDropoffAndPickUp, isLoading: isLoadingConfig } = useSWR<
        {
            pickup: NameValue[];
            dropoff: NameValue[];
        },
        Error
    >(router.isReady ? `/locations/points/${route}` : null, null, config);
    if (!listCoach || isLoadingHook) {
        return <LoadingPage />;
    }
    //console.log("Render count Coach: ", renderCount++, locations);
    return (
        <OverviewWrapper>
            <Head>
                <title>{`Đặt vé từ ${locationFrom} đến ${locationTo}`}</title>
            </Head>
            <HeaderWrapper>
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center">
                        <Logo />
                        {/* <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            flex={1}
                        >
                            <Box />
                            <Box>
                                <Button>Đăng nhập</Button>
                            </Box>
                        </Box> */}
                    </Box>
                </Container>
            </HeaderWrapper>

            <Container maxWidth="lg">
                <SearchWrapper elevation={2}>
                    <CardContent sx={{ padding: PureLightTheme.spacing(2) }}>
                        {isLoading || !locations || locations === undefined ? (
                            <CircularProgress />
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
                                <Grid item xs={12} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            htmlFor="select_from"
                                            shrink
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
                                <Grid item xs={12} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="select_to" shrink>
                                            Điểm đến
                                        </InputLabel>
                                        <Select
                                            native
                                            id="select_to"
                                            label="from"
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

                                <Grid item xs={12} md={3}>
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
                                <Grid item xs={12} md={3}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ height: "100%", width: "100%" }}
                                        onClick={onClickSearch}
                                        // disabled={disabled}
                                    >
                                        Tìm kiếm
                                    </Button>
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
                    spacing={{ xs: 6, md: 10 }}
                    paddingTop={PureLightTheme.spacing(2)}
                    justifyContent="center"
                    alignItems="center"
                    container
                >
                    {listCoach.length == 0 &&
                    !isLoadingHook &&
                    !isLoadingConfig ? (
                        <Grid item md={12} lg={12} mx="auto">
                            <Typography
                                sx={{
                                    padding: PureLightTheme.spacing(3),
                                    justifyContent: "center",
                                }}
                                variant="h3"
                            >
                                Không tìm thấy chuyến nào !
                            </Typography>
                        </Grid>
                    ) : (
                        <>
                            <Grid item md={2} lg={4} mx="auto">
                                <Card>
                                    <CardContent>
                                        <FormControlLabel
                                            label="Parent"
                                            control={
                                                <Checkbox
                                                    checked={
                                                        checked[0] && checked[1]
                                                    }
                                                    indeterminate={
                                                        checked[0] !==
                                                        checked[1]
                                                    }
                                                    onChange={handleChange1}
                                                />
                                            }
                                        />
                                        {children}
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={10} lg={8} mx="auto">
                                <MyContext.Provider
                                    value={{ addBooking, createURL }}
                                >
                                    <ListBooking
                                        listData={listCoach}
                                        listDropoffAndPickUp={
                                            listDropoffAndPickUp
                                        }
                                        addBooking={addBooking}
                                        createURL={createURL}
                                    />
                                </MyContext.Provider>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Container>
        </OverviewWrapper>
    );
};

Coach.Layout = BaseLayout;

export default Coach;
