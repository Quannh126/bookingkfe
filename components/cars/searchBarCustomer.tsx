import * as React from "react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { locationApi } from "@/api";
import dayjs from "dayjs";
import { Button, FormControl, InputLabel, Select } from "@mui/material";
import Router from "next/router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ILocationGrouped } from "@/models";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
type searchInfo = {
    startLocation: string;
    endLocation: string;
    journeyDate: string;
};
export interface ISerchProps {
    info: searchInfo;
}
const today = dayjs();
function onBlur() {
    console.log("blur");
}

function onFocus() {
    console.log("focus");
}

export default function SearchBarCoach({ info }: ISerchProps) {
    const [locations, setLocations] = useState<ILocationGrouped[]>([]);
    const [formData, setFormData] = useState({
        startLocation: info.startLocation,
        endLocation: info.endLocation,
        journeyDate: info.journeyDate,
    });
    const fetchAllLocations = async () => {
        const locations = await locationApi.getLocationGrouped();
        setLocations(locations);
    };

    const onClickSearch = () => {
        Router.push({
            pathname: "/coaches",
            query: formData,
        });
    };

    const onChangeFrom = (val: any) => {
        console.log(val.target.value);
        setFormData({ ...formData, ...{ startLocation: val.target.value } });
        // setFormData({ ...formData, ...{ startLocation: val } });
    };

    const onChangeTo = (val: any) => {
        console.log(val.target.value);
        setFormData({ ...formData, ...{ endLocation: val.target.value } });
    };

    const onChangeDate = (val: any) => {
        console.log(val.$d.format("YYYY-MM-DD"));
        const journeyDate = val.$d.format("YYYY-MM-DD");
        setFormData({ ...formData, ...{ journeyDate } });
    };
    useEffect(() => {
        fetchAllLocations();
    }, []);

    return (
        <Box
            component="section"
            sx={{
                mx: "auto",

                textAlign: "center",
                display: "flex",
            }}
        >
            <FormControl>
                <InputLabel htmlFor="select_from">Điểm đi</InputLabel>
                <Select
                    native
                    defaultValue=""
                    id="select_from"
                    label="from"
                    // size="small"
                    onChange={onChangeFrom}
                    onFocus={onFocus}
                    onBlur={onBlur}
                >
                    <option aria-label="None" value="" />
                    {locations.map((item, index) => {
                        console.log(item.header);
                        return (
                            <optgroup label={item.header} key={index}>
                                {item.point.map((item, itemIndex) => (
                                    <option
                                        key={itemIndex}
                                        value={item.code_group}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </optgroup>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="select_to">Điểm đến</InputLabel>
                <Select
                    native
                    defaultValue=""
                    id="select_to"
                    label="from"
                    // size="small"
                    onChange={onChangeTo}
                    onFocus={onFocus}
                    onBlur={onBlur}
                >
                    <option aria-label="None" value="" />
                    {locations.map((item, index) => {
                        console.log(item.header);
                        return (
                            <optgroup label={item.header} key={index}>
                                {item.point.map((item, itemIndex) => (
                                    <option
                                        key={itemIndex}
                                        value={item.code_group}
                                    >
                                        {item.name}
                                    </option>
                                ))}
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
                >
                    Tìm kiếm
                </Button>
            </Box>
        </Box>
    );
}
