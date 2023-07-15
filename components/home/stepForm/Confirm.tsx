import React, { useContext, useEffect } from "react";

import { Box } from "@mui/system";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    setFormStep3,
    nextStep,
    prevStep,
    getFormState,
} from "@/redux/stepForm";
import { IBookingForm } from "@/models";
import { selectTripState } from "@/redux/selectedTrip";
import { Grid, Typography } from "@mui/material";
import { InputField, MyCheckBox } from "@/components/form";
import { MyContext } from "@/pages/coaches";
// import { date } from "yup/lib/locale";
import { CreateURLPayment } from "@/hooks";
import { getErrorMessage } from "@/utils";
import { toast } from "react-toastify";

export default function Confirm() {
    const { addBooking, createURL } = useContext(MyContext);
    const formValues = useSelector(getFormState);
    const selectedTrip = useSelector(selectTripState).seletedTrip;
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        customer: yup.object().shape({
            name: yup.string().required("Xin hãy nhập tên"),
            phonenumber: yup.string().required("Xin hãy nhập số điện thoại"),
            email: yup
                .string()
                .matches(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
                    "Email không đúng định dạng"
                )
                .required("Xin hãy nhập email"),
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
        control,
        handleSubmit,
        // getValues,
        watch,
        // formState: { errors },
    } = useForm<IBookingForm>({
        defaultValues: {
            trip_id: selectedTrip._id,
            customer: {
                name: formValues["name"].value,
                phonenumber: formValues["phone"].value,
                email: formValues["email"].value,
            },
            is_payment_online: formValues["is_payment_online"].value,
            selected_seats: formValues["selected_seats"].value.join("-"),
            fare: formValues["fare"].value,
            note: formValues["note"].value,
            journey_date: selectedTrip.journey_date,
            pickup_point: formValues["pickup"].value,
            dropoff_point: formValues["dropoff"].value,
            status_payment: "not_yet_payment",
        },
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit",
    });
    const handleSubmitClick = async (data: IBookingForm) => {
        try {
            // console.log(formValues);

            // localStorage.setItem("formState", JSON.stringify(formValues));

            const order_id = await addBooking(data);
            const { message } = order_id;

            if (data.is_payment_online) {
                const createURLData: CreateURLPayment = {
                    amount: data.fare.toString(),
                    bankCode: "IB",
                    orderInfo: "Thanh toán vé " + message,
                    orderType: "billpayment",
                    locale: "vn",
                };
                await createURL(createURLData);
            }

            dispatch(nextStep());
        } catch (error: unknown) {
            // console.log(error);
            const msg = getErrorMessage(error);
            toast.error(msg);
        }
    };
    const watchCustomer = watch("customer");
    const watchNote = watch("note");
    const watchCheckBox = watch("is_payment_online");
    const heightTab = localStorage.getItem("step1height")!;
    useEffect(() => {
        dispatch(
            setFormStep3({
                name: watchCustomer.name,
                phone: watchCustomer.phonenumber,
                email: watchCustomer.email,
                note: watchNote,
                is_payment_online: watchCheckBox,
            })
        );
    }, [watchNote, watchCustomer, watchCheckBox, dispatch]);
    return (
        <Box
            sx={{
                padding: "30px",
                height: !heightTab
                    ? "unset"
                    : `${Number(heightTab)}px !important`,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    backgroundColor: "rgb(236, 244, 253)",
                }}
            >
                Chúng tôi chỉ dùng thông tin của bạn để đặt vé
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(handleSubmitClick)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <InputField
                            type="text"
                            label="Tên"
                            name="customer.name"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField
                            type="text"
                            label="Email"
                            name="customer.email"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField
                            type="text"
                            label="Số điện thoại"
                            name="customer.phonenumber"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MyCheckBox
                            label="Thanh toán trực tuyến"
                            name="is_payment_online"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField
                            type="text"
                            label="Ghi chú"
                            name="note"
                            multiline
                            rows={4}
                            control={control}
                        />
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: "auto",
                        marginLeft: "auto",
                    }}
                >
                    <Button sx={{ mr: 1 }} onClick={() => dispatch(prevStep())}>
                        Trở lại
                    </Button>
                    <Button variant="contained" color="success" type="submit">
                        Đặt vé
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
