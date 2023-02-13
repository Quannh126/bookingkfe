import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import {
    DatePickerField,
    InputField,
    InputMoneyField,
    SelectFieldNormal,
} from "../form";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
// import { locationApi } from "@/api-client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IBookingForm } from "@/models";
import { NameValue } from "@/models";

// import { carsApi } from "@/api-client";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import useSWR, { SWRConfiguration } from "swr";
import { TYPE_PAYMENT } from "@/config/type-sell";

import PhoneNumberField from "../form/phonenumber-field";

import useSWR, { SWRConfiguration } from "swr";
import IBookingTrip from "@/models/Book/book-trip";
// type configData = {
//     toLocations: Array<NameValue>;
//     fromLocations: Array<NameValue>;
// };
export interface BookFormProps {
    configProvince: Array<NameValue> | [];
    // configCar: Array<ICarDetail> | [];
    // eslint-disable-next-line no-unused-vars
    onBook?: (data: IBookingForm) => void;
    onCancel: () => void;
    tripDetail: IBookingTrip;
    selectedSeats: string;
    s_journey_date: string;
}

// let count = 0;

function getName(list: Array<NameValue>, value: String): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === value) {
            return list[i].name;
        }
    }
    return "";
}
export function BookForm({
    onBook,
    onCancel,
    configProvince,
    tripDetail,
    selectedSeats,
    s_journey_date,
}: // configCar,
BookFormProps) {
    const schema = yup.object().shape({
        customer: yup.object().required("Xin chọn khách hàng"),
    });
    const {
        // register,
        control,
        handleSubmit,
        // getValues,
        // setValue,\
        // watch,
        // formState: { errors },
    } = useForm<IBookingForm>({
        defaultValues: {
            customer: {},
            pickup_point: "",
            dropoff_point: "",
            note: "",
            journey_date: s_journey_date,
            trip_id: tripDetail._id,
            selected_seats: selectedSeats,
            fare: selectedSeats.split("-").length * Number(tripDetail.fare),
            status_payment: "direct_payment",
        },
        resolver: yupResolver(schema),
    });

    // const customer = watch("customer");
    // console.log(customer);
    function handleBookSubmit(data: IBookingForm) {
        console.log(data);
        onBook?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }
    // const [optionDropoff, setOptionDropoff] = useState([] as Array<NameValue>);
    // const [optionPickup, setOptionPickup] = useState([] as Array<NameValue>);
    const configPoint: SWRConfiguration = {
        dedupingInterval: 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
        shouldRetryOnError: true,
    };

    const dataRes = useSWR<
        { dropoff: Array<NameValue>; pickup: Array<NameValue> },
        Error
    >(`/admin/trips/option/${tripDetail._id}`, null, configPoint);

    return (
        <Box
            component="form"
            // onSubmit={}

            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                flexGrow: 1,
            }}
            p={4}
            onSubmit={handleSubmit(handleBookSubmit)}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={12}
                    display="flex"
                    sx={{ justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        Thông tin đặt vé
                    </Typography>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography
                                gutterBottom
                                variant="h3"
                                component="div"
                            >
                                Thông tin vé
                            </Typography>
                            <Divider sx={{ marginTop: 1 }} />
                            <Typography variant="h5">
                                {`${getName(
                                    configProvince,
                                    tripDetail.from_id!
                                )} 
                                 - 
                                ${getName(
                                    configProvince,
                                    tripDetail.to_id!
                                )} : ${tripDetail.departure_time}`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                            <SelectFieldNormal
                                allOptions={
                                    dataRes.isLoading || !dataRes.data
                                        ? []
                                        : (dataRes.data
                                              ?.pickup as Array<NameValue>)
                                }
                                control={control}
                                label="Điểm đón"
                                name="pickup_point"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <SelectFieldNormal
                                allOptions={
                                    dataRes.isLoading || !dataRes.data
                                        ? []
                                        : (dataRes.data
                                              ?.dropoff as Array<NameValue>)
                                }
                                control={control}
                                label="Điểm trả"
                                name="dropoff_point"
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                disabled
                                sx={{ m: 1 }}
                                size="small"
                                fullWidth
                                label="Khởi hành"
                                defaultValue={tripDetail.departure_time}
                            />
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                label="Dự kiến "
                                defaultValue={tripDetail.destination_time}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <DatePickerField
                                disabled
                                label="Ngày khởi hành"
                                name="journey_date"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputField
                                disabled
                                type="text"
                                label="Chỗc ngồi đã chọn"
                                name="selected_seats"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputMoneyField
                                disabled
                                type="text"
                                label="Giá"
                                name="fare"
                                control={control}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={0} md={2}></Grid>
                <Grid item xs={12} md={5}>
                    <Grid item xs={12} md={12}>
                        <Typography gutterBottom variant="h3" component="div">
                            Thông tin khách hàng
                        </Typography>
                        <Divider sx={{ marginTop: 1 }} />
                        <Typography variant="h5">
                            {` Tài xế: ${tripDetail.car.driver_name} 
                                 - Số điện thoại: ${tripDetail.car.phonenumber}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
                        <PhoneNumberField
                            type="text"
                            label="Khách hàng"
                            name="customer"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <SelectFieldNormal
                            allOptions={TYPE_PAYMENT}
                            control={control}
                            label="Trạng thái"
                            name="status_payment"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <InputField
                            multiline
                            rows={4}
                            type="text"
                            label="Ghi chú"
                            name="note"
                            control={control}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Box sx={{ marginTop: 2 }}>
                        <Button type="submit" variant="contained">
                            Đặt vé
                        </Button>

                        <Button
                            onClick={handleOnCancel}
                            sx={{
                                ml: 1,
                            }}
                        >
                            Huỷ
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
