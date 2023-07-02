import MainLayout from "@/components/layout/main";

import { Box } from "@mui/system";
// import { Stack } from "@mui/material";
// import { useRouter } from 'next/router'
import { ILocationGrouped, NextpageWithLayout } from "../models";
import { Popular } from "@/components/home";

import React, { useEffect, useState } from "react";

import Router from "next/router";
import {
    Button,
    CircularProgress,
    Container,
    FormControl,
    // Grid,
    InputLabel,
    Paper,
    PaperProps,
    Select,
    // Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { locationApi } from "@/api";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import useSWR, { SWRConfiguration } from "swr";

const SearchWrapper = styled(Paper)<PaperProps>(
    ({ theme }) => `
    background-color: ${theme.colors.primary.lighter};
  `
);

const today = dayjs();
// const threeLengthArray: Array<string> = [];
const Home: NextpageWithLayout = () => {
    const [locations, setLocations] = useState<ILocationGrouped[]>([]);
    const [formData, setFormData] = useState({
        startLocation: "",
        endLocation: "",
        journeyDate: today.format("YYYY-MM-DD"),
    });
    const [isLoading, setIsLoading] = useState(true);
    // const [disabled, setDisabled] = useState(true);
    // const config: SWRConfiguration = {
    //     dedupingInterval: 60 * 60 * 1000,
    //     revalidateOnMount: false,
    // };

    // const {
    //     data: locations,
    //     error,
    //     isLoading,
    // } = useSWR<Array<ILocationGrouped>, Error>(
    //     "/locations/group-options",
    //     null,
    //     config
    // );

    const onClickSearch = () => {
        console.log("Click search", formData);
        Router.push({
            pathname: "/coaches",
            query: formData,
        });
    };
    const onChangeFrom = (val: any) => {
        console.log(val.target.value);
        setFormData({ ...formData, ...{ startLocation: val.target.value } });
        // checkButtonDisabled();
    };
    const onChangeTo = (val: any) => {
        console.log(val.target.value);
        setFormData({ ...formData, ...{ endLocation: val.target.value } });
        // checkButtonDisabled();
    };

    const onChangeDate = (val: any) => {
        const journeyDate = val.$d;
        console.log(journeyDate);
        setFormData({ ...formData, ...{ journeyDate } });
        // checkButtonDisabled();
    };
    const fetchAllLocations = async () => {
        setIsLoading(true);
        const locations = await locationApi.getLocationGrouped();
        setLocations(locations);
        setIsLoading(false);
    };
    useEffect(() => {
        fetchAllLocations();
    }, []);
    return (
        <Box component="section">
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
                    {isLoading || !locations ? (
                        <CircularProgress />
                    ) : (
                        <Box
                            component="section"
                            sx={{
                                mx: "auto",

                                textAlign: "center",
                                display: "flex",
                            }}
                        >
                            <FormControl>
                                <InputLabel htmlFor="select_from">
                                    Điểm đi
                                </InputLabel>
                                <Select
                                    native
                                    defaultValue=""
                                    id="select_from"
                                    label="from"
                                    // size="small"
                                    onChange={onChangeFrom}
                                    // onFocus={onFocus}
                                    // onBlur={onBlur}
                                >
                                    <option aria-label="None" value="" />
                                    {locations!.map((item, index) => {
                                        return (
                                            <optgroup
                                                label={item.header}
                                                key={index}
                                            >
                                                {item.point.map(
                                                    (item, itemIndex) => (
                                                        <option
                                                            key={itemIndex}
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
                            <FormControl>
                                <InputLabel htmlFor="select_to">
                                    Điểm đến
                                </InputLabel>
                                <Select
                                    native
                                    defaultValue=""
                                    id="select_to"
                                    label="from"
                                    // size="small"
                                    onChange={onChangeTo}
                                    // onFocus={onFocus}
                                    // onBlur={onBlur}
                                >
                                    <option aria-label="None" value="" />
                                    {locations!.map((item, index) => {
                                        return (
                                            <optgroup
                                                label={item.header}
                                                key={index}
                                            >
                                                {item.point.map(
                                                    (item, itemIndex) => (
                                                        <option
                                                            key={itemIndex}
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box>
                                    <DatePicker
                                        defaultValue={today}
                                        disablePast
                                        onChange={onChangeDate}
                                        // slotProps={{
                                        //     textField: { size: "small" },
                                        //     iconButton: { size: "small" },
                                        // }}
                                        format="DD/MM/YYYY"
                                        views={["day", "month", "year"]}
                                    />
                                </Box>
                            </LocalizationProvider>

                            <Box
                                sx={{
                                    alignSelf: "center",
                                    height: "100%",
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={onClickSearch}
                                    // disabled={disabled}
                                >
                                    Tìm kiếm
                                </Button>
                            </Box>
                        </Box>
                    )}
                </SearchWrapper>
            </Container>

            <Popular />
        </Box>
    );
};

Home.Layout = MainLayout;

export default Home;
