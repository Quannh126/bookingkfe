import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    DatePickerField,
    InputField,
    InputMoneyField,
    SelectFieldNormal,
} from "../form";
import {
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
// import { locationApi } from "@/api-client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IBookingUpdateForm, ICustomer } from "@/models";
import { NameValue } from "@/models";

// import { carsApi } from "@/api-client";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import useSWR, { SWRConfiguration } from "swr";
import { TYPE_PAYMENT } from "@/config/type-sell";
import { styled } from "@mui/material/styles";
import PhoneNumberField from "../form/phonenumber-field";

import useSWR, { SWRConfiguration } from "swr";
import IBookingTrip, { ISeatDetail } from "@/models/Book/book-trip";
import { PureLightTheme } from "@/utils";
// type configData = {
//     toLocations: Array<NameValue>;
//     fromLocations: Array<NameValue>;
// };

export interface BookUpdateFormProps {
    configProvince: Array<NameValue> | [];
    // eslint-disable-next-line no-unused-vars
    updateBooking?: (data: IBookingUpdateForm) => void;
    onCancel: () => void;
    handleClickDelete: () => void;
    tripDetail: IBookingTrip;
    selectedSeats: string;
    s_journey_date: string;
    book_detail: ISeatDetail;
    list_id: string;
    alertText?: string;
    visibleAlertText?: boolean;
    openBookForm: boolean;
    // eslint-disable-next-line no-unused-vars
    onClose?: (event: Object, reason: string) => void;
}

// let count = 0;
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(theme.colors.error.main),
    backgroundColor: theme.colors.error.main,
    "&:hover": {
        backgroundColor: theme.colors.error.dark,
    },
    marginRight: "10px",
}));
function getName(list: Array<NameValue>, value: String): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === value) {
            return list[i].name;
        }
    }
    return "";
}

export function BookUpdateForm({
    updateBooking,
    openBookForm,
    onClose,
    onCancel,
    configProvince,
    tripDetail,
    s_journey_date,
    selectedSeats,
    book_detail,
    list_id,
    alertText,
    visibleAlertText,
    handleClickDelete,
}: // configCar,
BookUpdateFormProps) {
    const schema = yup.object().shape({
        customer: yup.object().required("Xin chọn khách hàng"),
        selected_seats: yup
            .string()
            .required("Xin nhập số ghế đã cập nhật")
            .matches(
                /^(?!.*(\b\d{1,2}\b).*\b\1\b)\b\d{1,2}\b(?:-\b\d{1,2}\b)*$/,
                "Ghế đã chọn phải có dạng nối bởi dấu '-' và không được lặp"
            ),
    });
    const isPaid = book_detail!.booking.status_payment === "paid";
    const {
        // register,
        control,
        handleSubmit,
        // getValues,
        setValue,
        watch,
        // formState: { errors },
    } = useForm<IBookingUpdateForm>({
        defaultValues: {
            list_id: list_id,
            customer: book_detail!.customer,
            pickup_point: book_detail!.booking.pickup_point,
            dropoff_point: book_detail!.booking.dropoff_point,
            note: book_detail!.booking.note,
            journey_date: s_journey_date,
            trip_id: tripDetail._id,
            selected_seats: selectedSeats,
            fare: selectedSeats.split("-").length * Number(tripDetail.fare),
            status_payment: book_detail!.booking.status_payment,
            ticket_code: book_detail!.booking.ticket_code,
        },
        resolver: yupResolver(schema),
    });

    // const customer = watch("customer");
    // //console.log(book_detail);
    function handleBookUpdateSubmit(data: IBookingUpdateForm) {
        // //console.log(data);
        updateBooking?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }
    let watchSeats = watch("selected_seats");

    const configPoint: SWRConfiguration = {
        dedupingInterval: 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
        shouldRetryOnError: true,
    };
    const customerGetOption: SWRConfiguration = {
        dedupingInterval: 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
        shouldRetryOnError: true,
    };

    const dataRes = useSWR<
        { dropoff: Array<NameValue>; pickup: Array<NameValue> },
        Error
    >(`/trips/option/${tripDetail._id}`, null, configPoint);
    const dataCustomer = useSWR<Array<ICustomer>, Error>(
        `/customer`,
        null,
        customerGetOption
    );

    useEffect(() => {
        setValue(
            "fare",
            watchSeats.split("-").length * Number(tripDetail.fare)
        );
    }, [watchSeats, tripDetail, setValue]);

    return (
        <Dialog
            open={openBookForm}
            // TransitionComponent={Transition}
            keepMounted={false}
            onClose={onClose}
            aria-labelledby="update-booked-seats"
            aria-describedby="update-booked-seats"
            sx={{ zIndex: 100 }}
            scroll="body"
        >
            <Box
                component="form"
                // onSubmit={}
                onSubmit={handleSubmit(handleBookUpdateSubmit)}
            >
                <DialogTitle
                    id="add-trip"
                    display="flex"
                    sx={{ justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        Thông tin đặt vé
                    </Typography>
                </DialogTitle>
                <DialogContent dividers={false}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography
                                gutterBottom
                                variant="h3"
                                component="div"
                                sx={{ alignContent: "center" }}
                            >
                                {`${getName(
                                    configProvince,
                                    tripDetail.from_id!
                                )} 
                                 - 
                                ${getName(
                                    configProvince,
                                    tripDetail.to_id!
                                )} - ${tripDetail.departure_time}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h5">
                                {` Tài xế: ${tripDetail.car.driver_name} 
                                 - ${tripDetail.car.phonenumber}`}
                            </Typography>
                            <Divider sx={{ marginTop: 1 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectFieldNormal
                                disabled={isPaid}
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
                        <Grid item xs={12} md={6}>
                            <SelectFieldNormal
                                disabled={isPaid}
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                label="Khởi hành"
                                defaultValue={tripDetail.departure_time}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                size="small"
                                fullWidth
                                label="Dự kiến "
                                defaultValue={tripDetail.destination_time}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePickerField
                                disabled
                                label="Ngày khởi hành"
                                name="journey_date"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                disabled={isPaid}
                                type="text"
                                label="Chỗ ngồi đã chọn"
                                name="selected_seats"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputMoneyField
                                disabled
                                type="text"
                                label="Giá"
                                name="fare"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}></Grid>

                        <Grid item xs={12} md={12}>
                            <Divider sx={{ marginTop: 1 }} />
                            <Typography
                                gutterBottom
                                variant="h3"
                                component="div"
                            >
                                Thông tin khách hàng
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PhoneNumberField
                                optionsData={dataCustomer}
                                disabled
                                type="text"
                                label="Số điện thoại"
                                name="customer.phonenumber"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                disabled
                                type="text"
                                label="Khách hàng"
                                name="customer.name"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                disabled
                                type="text"
                                label="Email"
                                name="customer.email"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectFieldNormal
                                disabled={isPaid}
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
                </DialogContent>
                <DialogActions>
                    {visibleAlertText && (
                        <Typography
                            sx={{
                                color: PureLightTheme.colors.error.main,
                                marginRight: 6,
                                marginTop: 3,
                            }}
                            component="h4"
                            variant="h4"
                        >
                            {alertText}
                        </Typography>
                    )}
                    <Box sx={{ marginTop: 2 }}>
                        <ColorButton
                            variant="contained"
                            onClick={handleClickDelete}
                        >
                            Huỷ vé
                        </ColorButton>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Button type="submit" variant="contained">
                            Cập nhật
                        </Button>

                        <Button
                            onClick={handleOnCancel}
                            sx={{
                                ml: 1,
                            }}
                        >
                            Đóng
                        </Button>
                    </Box>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
