import { Box } from "@mui/system";
import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import {
    InputField,
    InputMoneyField,
    SelectField,
    SelectFieldNormal,
} from "../form";
import {
    Button,
    Divider,
    // FilledInput,
    Grid,
    IconButton,
    // TextField,
    Typography,
} from "@mui/material";

// import { locationApi } from "@/api-client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITripForm } from "@/models/Trips/trip-form";
import { NameValue } from "@/models";
// import { carsApi } from "@/api-client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useSWR, { SWRConfiguration } from "swr";
import { TYPE_SELL } from "@/config/type-sell";

// type configData = {
//     toLocations: Array<NameValue>;
//     fromLocations: Array<NameValue>;
// };
export interface TripFormProps {
    configProvince: Array<NameValue> | [];
    // configCar: Array<ICarDetail> | [];
    // eslint-disable-next-line no-unused-vars
    onAdd?: (data: ITripForm) => void;
    onCancel: () => void;
}

// let count = 0;
export function TripForm({
    onAdd,
    onCancel,
    configProvince,
}: // configCar,
TripFormProps) {
    const schema = yup.object().shape({
        to_id: yup.string().required("Please enter to"),

        from_id: yup.string().required("Please enter from"),
        car_id: yup.string().required("Vui lòng chọn xe"),
        departure_time: yup
            .string()
            .required("Vui lòng nhập thời gian khởi hành")
            .matches(
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                "Giờ khởi hành có định dạng mm:hh"
            ),
        destination_time: yup
            .string()
            .required("Vui lòng nhập thời gian dự kiến")
            .matches(
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                "Giờ dự kiến có định dạng mm:hh"
            ),
        fare: yup
            .string()
            .required("Vui lòng nhập giá vé")
            .matches(/^[0-9]+$/, "Giá tiền chỉ có thể là số"),

        //sell_type: yup.string().required("Vui lòng chọn kiểu bán vé"),
        // ^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$
        //car: yup.string().required("Please select car"),
    });
    const {
        // register,
        control,
        watch,
        handleSubmit,
        // getValues,
        // setValue,
        formState: { errors },
    } = useForm<ITripForm>({
        defaultValues: {
            to_id: "2",
            from_id: "1",
            car_id: "",
            sell_type: "normal",
            fare: 0,
        },
        resolver: yupResolver(schema),
    });

    const watchFrom = watch("from_id", "");
    const watchTo = watch("to_id", "");
    // const watchCar = watch("car_id", "");
    const formValuesPK = useWatch({
        name: "pickup_point",
        control,
    });

    const formValuesDO = useWatch({
        name: "dropoff_point",
        control,
    });
    const useFieldArray1 = useFieldArray({
        name: "pickup_point",
        control,
    });

    const useFieldArray2 = useFieldArray({
        name: "dropoff_point",
        control,
    });
    // const useFieldArray2 = useFieldArray({
    //     name: "dropoff_point",
    //     control,
    // });

    function handleAddSubmit(data: ITripForm) {
        //console.log(data);
        onAdd?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: false,
        revalidateOnFocus: false,
    };
    const config2: SWRConfiguration = {
        revalidateOnMount: true,
        revalidateOnFocus: true,
        refreshWhenHidden: true,
    };
    const listDistrictFrom = useSWR<Array<NameValue> | [], Error>(
        `/locations/options/${watchFrom}`,
        null,
        config
    );

    const listDistrictTo = useSWR<Array<NameValue> | [], Error>(
        `/locations/options/${watchTo}`,
        null,
        config
    );

    const listDetailPK = useSWR<Array<Array<NameValue>> | [], Error>(
        `/locations/detail/${watchFrom}`,
        null,
        config
    );

    const listDetailDO = useSWR<Array<Array<NameValue>> | [], Error>(
        `/locations/detail/${watchTo}`,
        null,
        config
    );
    const listMenuCar = useSWR<Array<NameValue> | [], Error>(
        `/cars/carsyettostart`,
        null,
        config2
    );

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                flexGrow: 1,
            }}
            p={4}
            onSubmit={handleSubmit(handleAddSubmit)}
        >
            <Grid container spacing={1}>
                <Grid
                    item
                    xs={12}
                    md={12}
                    display="flex"
                    sx={{ justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h4" component="div">
                        Lập lịch chạy
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h6" component="div">
                        Tuyến
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectFieldNormal
                        allOptions={configProvince}
                        control={control}
                        label="Từ"
                        name="from_id"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectFieldNormal
                        allOptions={configProvince}
                        control={control}
                        label="Đến"
                        name="to_id"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        justifySelf="center"
                    >
                        Chi tiết
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Thời gian khởi hành"
                        name="departure_time"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Thời gian dự kiến"
                        name="destination_time"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputMoneyField
                        type="text"
                        label="Giá"
                        name="fare"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectFieldNormal
                        allOptions={TYPE_SELL}
                        control={control}
                        label="Kiểu bán vé"
                        name="sell_type"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectField
                        allOptions={
                            listMenuCar.data === undefined
                                ? []
                                : listMenuCar.data
                        }
                        control={control}
                        label="Tên phương tiện"
                        name="car_id"
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        justifySelf="center"
                    >
                        Điểm đón trả khách
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                    <Typography
                        gutterBottom
                        component="p"
                        sx={{ alignSelf: "center" }}
                    >
                        Đón khách
                    </Typography>

                    <IconButton
                        aria-label="Edit"
                        onClick={() =>
                            useFieldArray1.append({
                                point_id: "",
                                district_id: "",
                            })
                        }
                    >
                        <AddCircleIcon />
                    </IconButton>
                    <Divider />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                {useFieldArray1.fields.map((field, index1) => {
                    return (
                        <Grid container spacing={1} key={field.id}>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <IconButton
                                    aria-label="Remove"
                                    onClick={() =>
                                        useFieldArray1.remove(index1)
                                    }
                                >
                                    <RemoveCircleIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectFieldNormal
                                    allOptions={
                                        listDistrictFrom.data === undefined
                                            ? []
                                            : listDistrictFrom.data
                                    }
                                    control={control}
                                    label="Quận"
                                    className={
                                        errors?.pickup_point?.[index1]
                                            ?.district_id
                                            ? "error"
                                            : ""
                                    }
                                    defaultValue={field.district_id}
                                    name={`pickup_point.${index1}.district_id`}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectFieldNormal
                                    allOptions={
                                        listDetailPK.data === undefined ||
                                        !formValuesPK[index1]
                                            ? []
                                            : listDetailPK.data[
                                                  Number(
                                                      formValuesPK[index1]
                                                          .district_id
                                                  )
                                              ]
                                    }
                                    control={control}
                                    label="Tên địa điểm"
                                    className={
                                        errors?.pickup_point?.[index1]?.point_id
                                            ? "error"
                                            : ""
                                    }
                                    defaultValue={field.point_id}
                                    name={`pickup_point.${index1}.point_id`}
                                />
                            </Grid>
                        </Grid>
                    );
                })}

                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                    <Typography
                        gutterBottom
                        component="p"
                        sx={{ alignSelf: "center" }}
                    >
                        Trả khách
                    </Typography>

                    <IconButton
                        aria-label="Edit"
                        onClick={() =>
                            useFieldArray2.append({
                                point_id: "",
                                district_id: "",
                            })
                        }
                    >
                        <AddCircleIcon />
                    </IconButton>
                    <Divider />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                {useFieldArray2.fields.map((field, index) => {
                    return (
                        <Grid container spacing={1} key={field.id}>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <IconButton
                                    aria-label="Remove"
                                    onClick={() => useFieldArray2.remove(index)}
                                >
                                    <RemoveCircleIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectFieldNormal
                                    allOptions={
                                        listDistrictTo.data === undefined
                                            ? []
                                            : listDistrictTo.data
                                    }
                                    control={control}
                                    label="Quận"
                                    className={
                                        errors?.dropoff_point?.[index]
                                            ?.district_id
                                            ? "error"
                                            : ""
                                    }
                                    defaultValue={field.district_id}
                                    name={`dropoff_point.${index}.district_id`}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectFieldNormal
                                    allOptions={
                                        listDetailDO.data === undefined ||
                                        !formValuesDO[index]
                                            ? []
                                            : listDetailDO.data[
                                                  Number(
                                                      formValuesDO[index]
                                                          .district_id
                                                  )
                                              ]
                                    }
                                    control={control}
                                    label="Tên địa điểm"
                                    className={
                                        errors?.dropoff_point?.[index]?.point_id
                                            ? "error"
                                            : ""
                                    }
                                    defaultValue={field.point_id}
                                    name={`dropoff_point.${index}.point_id`}
                                />
                            </Grid>
                        </Grid>
                    );
                })}

                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Box sx={{ marginTop: 2 }}>
                        <Button type="submit" variant="contained">
                            Thêm
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
                </Grid>
            </Grid>
        </Box>
    );
}
