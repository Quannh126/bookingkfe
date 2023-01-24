import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Control, useWatch } from "react-hook-form";
import { SelectField, SelectFieldNormal } from "../form";
import { Button, Grid, Typography } from "@mui/material";
import { locationApi } from "@/api-client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ITripForm } from "@/models/Trips/trip-form";
import { KeyValue } from "@/models";
// type configData = {
//     toLocations: Array<KeyValue>;
//     fromLocations: Array<KeyValue>;
// };
export interface TripFormProps {
    configProvince: Array<KeyValue>;
    // eslint-disable-next-line no-unused-vars
    onAdd?: (data: ITripForm) => void;
    onCancel: () => void;
}

export function TripForm({ onAdd, onCancel, configProvince }: TripFormProps) {
    const schema = yup.object().shape({
        to_id: yup
            .string()
            .required("Please enter to")
            .min(4, "Have at least 4 characters"),
        from_id: yup
            .string()
            .required("Please enter from")
            .min(4, "Have at least 4 characters"),

        fare: yup
            .string()
            .required("Please enter fare")
            .matches(/^[0-9]+$/, "Fare be only digits"),
        //car: yup.string().required("Please select car"),
    });
    const {
        register,
        control,
        handleSubmit,
        // getValues,
        formState: { errors },
    } = useForm<ITripForm>({
        defaultValues: {
            to_id: "1",
        },
        resolver: yupResolver(schema),
    });
    const [toId, setToId] = useState("");
    const [fromId, setFromId] = useState("");
    const [listDistrict, setListDistrict] = useState([] as Array<KeyValue>);
    const [districtId, setDistrict] = useState("");
    const [list2, setListPoint] = useState([] as Array<KeyValue>);

    const useFieldArray1 = useFieldArray({
        name: "pickup_point",
        control,
    });
    // const useFieldArray2 = useFieldArray({
    //     name: "dropoff_point",
    //     control,
    // });

    function handleAddSubmit(data: ITripForm) {
        onAdd?.(data);
    }
    function handleOnCancel() {
        onCancel();
    }
    // const Total = ({ control }: { control: Control<ITripForm> }) => {
    //     const formValues = useWatch({
    //       name: "cart",
    //       control
    //     });
    //     const total = formValues.reduce(
    //       (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    //       0
    //     );
    //     return <p>Total Amount: {total}</p>;
    // };
    useEffect(() => {
        async function fetchData() {
            const listDistrictFrom = await locationApi.getListDistrict(fromId);
            const listPoint = await locationApi.getListPoint(
                fromId,
                districtId
            );
            setListDistrict(listDistrictFrom);
            setListPoint(listPoint);
        }

        fetchData();
    }, [districtId, fromId]);
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
            onSubmit={handleSubmit(handleAddSubmit)}
            //onSubmit={() => console.log("submit")}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        Tuyến đường
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectFieldNormal
                        allOptions={configProvince}
                        control={control}
                        label="Từ"
                        {...register("from_id")}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SelectFieldNormal
                        allOptions={configProvince}
                        control={control}
                        label="Đến"
                        {...register("to_id")}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        justifySelf="center"
                    >
                        Điểm đón trả khách
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography gutterBottom variant="h6" component="div">
                        Đón khách
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button
                        onClick={() =>
                            useFieldArray1.append({
                                point_id: "",
                                district_id: "",
                            })
                        }
                    >
                        Add
                    </Button>
                </Grid>
                {useFieldArray1.fields.map((field, index) => {
                    return (
                        <Grid container spacing={1} key={field.id}>
                            <Grid item xs={12} md={12}>
                                <Button
                                    onClick={() => useFieldArray1.remove(index)}
                                >
                                    Delete
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectFieldNormal
                                    allOptions={listDistrict}
                                    control={control}
                                    label="Quận"
                                    className={
                                        errors?.pickup_point?.[index]
                                            ?.district_id
                                            ? "error"
                                            : ""
                                    }
                                    defaultValue={field.district_id}
                                    {...register(
                                        `pickup_point.${index}.district_id` as const,
                                        {
                                            required: true,
                                        }
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectFieldNormal
                                    allOptions={list2}
                                    control={control}
                                    label="Tên địa điểm"
                                    className={
                                        errors?.pickup_point?.[index]?.point_id
                                            ? "error"
                                            : ""
                                    }
                                    defaultValue={field.point_id}
                                    {...register(
                                        `pickup_point.${index}.point_id` as const,
                                        {
                                            required: true,
                                        }
                                    )}
                                />
                            </Grid>
                        </Grid>
                    );
                })}

                <Grid item xs={12} md={8}></Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            margin: "normal",
                        }}
                    >
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button onClick={handleOnCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
