// import MainLayout from "@/components/layout/main";

import { Box } from "@mui/system";
// import { Stack } from "@mui/material";
// import { useRouter } from 'next/router'
import { ILocationGrouped, NextpageWithLayout } from "../models";
// import { Popular } from "@/components/home";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setFilterSL,
    setFilterEL,
    setFilterJD,
    selectFilterState,
} from "@/redux/selectedFilter";
import Router from "next/router";
import {
    // Avatar,
    Button,
    Card,
    CardContent,
    CardProps,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    // Paper,
    // PaperProps,
    Select,
    // TextField,
    // Typography,
    // IconButton,
    Typography,
    Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { locationApi } from "@/api";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import InstructCard from "@/components/home/InstructComponent";
import { PureLightTheme } from "@/utils";
import BaseLayout from "@/components/layout/BaseLayout";
import Logo from "@/components/Logo";
import LoadingPage from "@/components/common/loading";
import Footer from "@/components/Footer";
// import useSWR, { SWRConfiguration } from "swr";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
const SearchWrapper = styled(Card)<CardProps>(
    ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
  `
);
const HotlineWapper = styled(Box)(
    ({ theme }) => `
    padding: ${theme.spacing(1)};
    position: fixed;
    bottom: 115px;
    right: 0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 24px 0px 0px 24px;
    background-color: #5569ff;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
  `
);
// const OverviewWrapper = styled(Box)(
//     ({ theme }) => `
//       overflow: auto;
//       flex: 1;
//       overflow-x: hidden;
//   `
// );
const HeaderWrapper = styled(Card)(
    ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    
  `
);
// margin-bottom: ${theme.spacing(6)};
// const BorderIcon = styled(Avatar)(
//     ({ theme }) => `
//     background-color: #FDEAD2,
//     border: 1px solid ${theme.palette.info.main},
//     color: #FDEAD2,
//   `
// );
const today = moment();
// const threeLengthArray: Array<string> = [];
const Home: NextpageWithLayout = () => {
    // const router = useRouter();
    const formState = useSelector(selectFilterState);
    const dispatch = useDispatch();
    const [locations, setLocations] = useState<ILocationGrouped[]>([]);
    // const [formData, setFormData] = useState({
    //     startLocation: "",
    //     endLocation: "",
    //     journeyDate: today.format("YYYY-MM-DD"),
    // });
    const [isLoading, setIsLoading] = useState(true);

    const onClickSearch = () => {
        // console.log("Click search", formData);
        Router.push({
            pathname: "/coaches",
        });
    };
    const onChangeFrom = (val: any) => {
        console.log(val.target.value);
        dispatch(setFilterSL(val.target.value));
        // setFormData({ ...formData, ...{ startLocation: val.target.value } });
        // checkButtonDisabled();
    };
    const onChangeTo = (val: any) => {
        console.log(val.target.value);
        dispatch(setFilterEL(val.target.value));
        //setFormData({ ...formData, ...{ endLocation: val.target.value } });
        // checkButtonDisabled();
    };

    const onChangeDate = (val: any) => {
        console.log(val._d);
        const journeyDate = today.format("YYYY-MM-DD");
        dispatch(setFilterJD(journeyDate));
        //setFormData({ ...formData, ...{ journeyDate } });
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
    if (isLoading) {
        return <LoadingPage />;
    }
    return (
        <Box
            sx={{
                overflow: "auto",
                flex: 1,
                overflowX: "hidden",
            }}
        >
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
            <Box>
                <Box
                    component="img"
                    sx={{
                        height: 600,
                        zIndex: -1,
                        width: "100%",
                        position: "absolute",
                    }}
                    src="/img/background.jpg"
                ></Box>
            </Box>
            <Container maxWidth="lg" sx={{ marginTop: 25, marginBottom: 20 }}>
                <SearchWrapper elevation={2}>
                    <CardContent sx={{ padding: PureLightTheme.spacing(3) }}>
                        {isLoading || !locations ? (
                            <CircularProgress />
                        ) : (
                            <Grid
                                container
                                spacing={1}
                                sx={{
                                    paddingBottom: PureLightTheme.spacing(2),
                                }}
                            >
                                <Grid item xs={12} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="select_from">
                                            Điểm đi
                                        </InputLabel>
                                        <Select
                                            native
                                            defaultValue={
                                                formState.startLocation
                                            }
                                            id="select_from"
                                            label="from"
                                            // size="small"
                                            fullWidth
                                            onChange={onChangeFrom}
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
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="select_to">
                                            Điểm đến
                                        </InputLabel>
                                        <Select
                                            native
                                            defaultValue={formState.endLocation}
                                            id="select_to"
                                            label="from"
                                            fullWidth
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
                                                defaultValue={moment(
                                                    formState.journey_date
                                                )}
                                                disablePast
                                                onChange={onChangeDate}
                                                // slotProps={{

                                                //     textField: { size: "small" },
                                                //     iconButton: { size: "small" },
                                                // }}
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
                        <Divider />
                        <InstructCard />
                    </CardContent>
                </SearchWrapper>
            </Container>

            {/* <Popular /> */}
            <HotlineWapper>
                <Avatar sx={{ backgroundColor: "#fff" }}>
                    <LocalPhoneTwoToneIcon color="primary" />
                </Avatar>
                <Typography
                    sx={{
                        color: "#fff",
                        marginLeft: PureLightTheme.spacing(1),
                    }}
                >
                    Tổng đài hỗ trợ
                </Typography>
            </HotlineWapper>
            <Footer />
        </Box>
    );
};

Home.Layout = BaseLayout;

export default Home;
