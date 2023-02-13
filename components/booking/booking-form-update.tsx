import { Box } from "@mui/system";
import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { InputField, SelectField, SelectFieldNormal } from "../form";
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
export interface TripFormUpdateProps {
    configProvince: Array<NameValue> | [];
    // configCar: Array<ICarDetail> | [];
    // eslint-disable-next-line no-unused-vars
    onUpdate?: (data: ITripForm) => void;
    onCancel: () => void;
    data: ITripForm;
}

let count = 0;
export function BookFormUpdate({
    onUpdate,
    onCancel,
    configProvince,
    data,
}: // configCar,
TripFormUpdateProps) {
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
        defaultValues: data,
        resolver: yupResolver(schema),
    });

    // const [toId, setToId] = useState("");
    // const [fromId, setFromId] = useState("");
    // const [listDistrictPK, setListDistrictPK] = useState(
    //     [] as Array<Array<NameValue>>
    // );
    // const [listDistrictDO, setListDistrictDO] = useState(
    //     [] as Array<Array<NameValue>>
    // );
    // const [listPointPK, setListPointPK] = useState(
    //     [] as Array<Array<NameValue>>
    // );
    // const [listPointDO, setListPointPK] = useState(
    //     [] as Array<Array<NameValue>>
    // );
    // const [districtId, setDistrict] = useState("");

    // const watchAllfield = watch();
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

    function handleUpdateSubmit(data: ITripForm) {
        console.log(data);
        onUpdate?.(data);
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
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };
    const listDistrictFrom = useSWR<Array<NameValue> | [], Error>(
        `/admin/locations/options/${watchFrom}`,
        null,
        config
    );

    const listDistrictTo = useSWR<Array<NameValue> | [], Error>(
        `/admin/locations/options/${watchTo}`,
        null,
        config
    );

    const listDetailPK = useSWR<Array<Array<NameValue>> | [], Error>(
        `/admin/locations/detail/${watchFrom}`,
        null,
        config
    );

    const listDetailDO = useSWR<Array<Array<NameValue>> | [], Error>(
        `/admin/locations/detail/${watchTo}`,
        null,
        config
    );
    const listMenuCar = useSWR<Array<NameValue> | [], Error>(
        `/admin/cars/carsyettostart`,
        null,
        config2
    );

    count++;
    console.log(count);
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
            onSubmit={handleSubmit(handleUpdateSubmit)}
            //onSubmit={() => console.log("submit")}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        Lập lịch chạy
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectFieldNormal
                        allOptions={configProvince}
                        control={control}
                        label="Từ"
                        // {...register("from_id")}
                        name="from_id"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectFieldNormal
                        allOptions={configProvince}
                        control={control}
                        label="Đến"
                        // {...register("to_id")}
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
                        Thời gian
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Khởi hành"
                        name="departure_time"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        type="text"
                        label="Dự kiến"
                        name="destination_time"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
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
                        // {...register("to_id")}
                        name="sell_type"
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
                        Chọn xe
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelectField
                        allOptions={
                            listMenuCar.data === undefined
                                ? []
                                : listMenuCar.data
                        }
                        control={control}
                        label="Xe"
                        // {...register("to_id")}
                        //onChange={(e) => setCarId(e.target?.value.toString())}
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
                        sx={{ alignSelf: "end" }}
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
                        sx={{ alignSelf: "end" }}
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

                <Grid item xs={12} md={9}></Grid>

                <Grid item xs={12} md={1}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: "normal",
                        }}
                    >
                        Cập nhật
                    </Button>
                </Grid>

                <Grid item xs={12} md={1} ml={1}>
                    <Button onClick={handleOnCancel}>Huỷ</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
