import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    DatePickerField,
    InputField,
    InputMoneyField,
    SelectFieldNormal,
} from "../form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IBookingForm, ICustomer } from "@/models";
import { NameValue } from "@/models";
import { TYPE_PAYMENT } from "@/config/type-sell";
import PhoneNumberField from "../form/phonenumber-field";
import useSWR, { SWRConfiguration } from "swr";
import IBookingTrip from "@/models/Book/book-trip";
import { PureLightTheme } from "@/utils";
export interface BookFormProps {
    configProvince: Array<NameValue> | [];
    // eslint-disable-next-line no-unused-vars
    onBook?: (data: IBookingForm) => void;
    onCancel: () => void;
    tripDetail: IBookingTrip;
    selectedSeats: string;
    s_journey_date: string;
    visibleAlertText?: boolean;
    alertText?: string;
    openBookForm: boolean;
    // eslint-disable-next-line no-unused-vars
    onClose?: (event: Object, reason: string) => void;
}

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
    onClose,
    openBookForm,
    configProvince,
    tripDetail,
    selectedSeats,
    s_journey_date,
    alertText,
    visibleAlertText,
}: BookFormProps) {
    const schema = yup.object().shape({
        customer: yup.object().shape({
            name: yup.string().required("Xin hãy nhập tên khách hàng"),
            phonenumber: yup.string().required("Xin hãy nhập số điện thoại"),
            email: yup
                .string()
                .matches(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
                    "Email không đúng định dạng"
                ),
        }),
        selected_seats: yup
            .string()
            .required("Xin nhập số ghế đã cập nhật")
            .matches(
                /^\d+(?:-\d+)*$/,
                "Ghế đã chọn phải có dạng nối bởi dấu '-'"
            ),
        pickup_point: yup.string().required("Xin hãy chọn nơi đón"),
        dropoff_point: yup.string().required("Xin hãy chọn nơi đến"),
    });
    const {
        register,
        control,
        handleSubmit,
        // getValues,
        setValue,
        // watch,
        // formState: { errors },
    } = useForm<IBookingForm>({
        defaultValues: {
            customer: {
                _id: "",
                phonenumber: "",
                name: "",
                email: "",
            },
            pickup_point: "",
            dropoff_point: "",
            note: "",
            journey_date: s_journey_date,
            trip_id: tripDetail._id,
            selected_seats: selectedSeats,
            fare: selectedSeats.split("-").length * Number(tripDetail.fare),
            status_payment: "not_yet_payment",
        },
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
    });
    const [isDisable, setIsDisable] = useState(false);

    // let phonenumber = watch("customer.phonenumber");

    // const customer = watch("customer");
    // //console.log(customer);
    function handleBookSubmit(data: IBookingForm) {
        // //console.log(data);
        onBook?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }

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
    // const phonenumber = watch('customer.phonenumber',"");

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //  //console.log(event)
        const customer = dataCustomer.data!.find(
            (item) => item.phonenumber === event.target.value
        );
        if (customer) {
            setValue("customer._id", customer._id);
            setValue("customer.name", customer.name);
            setValue("customer.email", customer.email);
            setIsDisable(true);
        } else {
            setValue("customer.name", "khách hàng mới");
            setValue("customer.email", "");
            setValue("customer._id", "");
            setIsDisable(false);
        }
    };
    //console.log(count++);
    return (
        <Dialog
            open={openBookForm}
            // TransitionComponent={Transition}
            keepMounted={false}
            onClose={onClose}
            aria-labelledby="add-booking"
            aria-describedby="add-booking"
            scroll={"body"}
        >
            <Box component="form" onSubmit={handleSubmit(handleBookSubmit)}>
                <DialogTitle
                    id="add-booking"
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
                                disabled={true}
                                label="Ngày khởi hành"
                                name="journey_date"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                disabled
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
                                type="text"
                                label="Số điện thoại"
                                // name="customer.phonenumber"
                                control={control}
                                {...register("customer.phonenumber", {
                                    onChange: (e) => handlePhoneChange(e),
                                })}
                                ref={null}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                disabled={isDisable}
                                type="text"
                                label="Khách hàng"
                                name="customer.name"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputField
                                disabled={isDisable}
                                type="text"
                                label="Email"
                                name="customer.email"
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                </DialogContent>
                <DialogActions>
                    <Box sx={{ marginTop: 2 }}>
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
                                {" "}
                                {alertText}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained">
                            Đặt vé
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
