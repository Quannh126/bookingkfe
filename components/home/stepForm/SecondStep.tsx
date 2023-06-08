import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";

import {
    setFormStep2,
    nextStep,
    prevStep,
    getFormState,
} from "@/redux/stepForm";
import { FormControl, Radio, RadioGroup, Typography } from "@mui/material";
import { selectTripState } from "@/redux/selectedTrip";
import { NameValue } from "@/models";
// import { setFormStep2, nextStep, getFormState } from "@/redux/stepForm";
function getName(list: Array<NameValue>, value: String): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === value) {
            return list[i].name;
        }
    }
    return "";
}
export default function SecondStep() {
    const dispatch = useDispatch();

    const formValues = useSelector(getFormState);
    const selectedTrip = useSelector(selectTripState).seletedTrip;
    const { pickup, dropoff } = formValues;

    // const isError = () => false;
    const isError = useCallback(
        () =>
            Object.keys({ pickup, dropoff }).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            ),
        [formValues, pickup, dropoff]
    );

    const listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    } = JSON.parse(localStorage.getItem("listDropoffAndPickUp")!);
    const listPickup = selectedTrip?.pickup_point;
    const listDropoff = selectedTrip?.dropoff_point;
    const [pickupPoint, setPickupPoint] = React.useState(
        listPickup[0].district_id + "-" + listPickup[0].point_id
    );

    const [dropoffPoint, setDropoffPoint] = React.useState(
        listDropoff[0].district_id + "-" + listDropoff[0].point_id
    );
    const handleChangeDropoff = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDropoffPoint(event.target.value);
    };

    const handleChangePickup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPickupPoint(event.target.value);
    };
    const heightTab = localStorage.getItem("step1height")!;
    useEffect(() => {
        dispatch(setFormStep2({ pickup: pickupPoint, dropoff: dropoffPoint }));
    }, [pickupPoint, dropoffPoint, dispatch]);
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
            }}
        >
            <Box sx={{ display: "flex" }}>
                <Grid container>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            borderRight: "1px solid rgb(192, 192, 192)",
                        }}
                    >
                        <Box
                            display="flex"
                            sx={{
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    backgroundColor: "rgb(247, 247, 247)",
                                    width: "90%",
                                    height: "60px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                Điểm đón
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="pickup"
                                    defaultValue={pickupPoint}
                                    name="pickup_point"
                                    sx={{
                                        maxHeight: "400px",
                                        overflow: "auto",
                                    }}
                                    onChange={handleChangePickup}
                                >
                                    {listPickup.map((point, index) => {
                                        const value =
                                            point.district_id +
                                            "-" +
                                            point.point_id;
                                        const label =
                                            // selectedTrip?.departure_time +
                                            // ` • ` +
                                            getName(
                                                listDropoffAndPickUp.pickup,
                                                value
                                            );
                                        return (
                                            <FormControlLabel
                                                value={value}
                                                control={<Radio />}
                                                label={label}
                                                key={index}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            borderLeft: "1px solid rgb(192, 192, 192)",
                        }}
                    >
                        <Box
                            display="flex"
                            sx={{
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    backgroundColor: "rgb(247, 247, 247)",
                                    width: "90%",
                                    height: "60px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                Điểm trả
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="dropoff"
                                    defaultValue={dropoffPoint}
                                    name="dropoff_point"
                                    sx={{
                                        maxHeight: "400px",
                                        overflow: "auto",
                                    }}
                                    onChange={handleChangeDropoff}
                                >
                                    {listDropoff.map((point, index) => {
                                        const value =
                                            point.district_id +
                                            "-" +
                                            point.point_id;
                                        const label =
                                            // selectedTrip?.destination_time +
                                            // ` • ` +
                                            getName(
                                                listDropoffAndPickUp.dropoff,
                                                value
                                            );
                                        return (
                                            <FormControlLabel
                                                value={value}
                                                control={<Radio />}
                                                label={label}
                                                key={index}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: "auto",
                }}
            >
                <Button onClick={() => dispatch(prevStep())} sx={{ mr: 1 }}>
                    Quay lại
                </Button>
                <Button
                    variant="contained"
                    disabled={isError()}
                    color="primary"
                    onClick={
                        !isError() ? () => dispatch(nextStep()) : () => null
                    }
                >
                    Tiếp
                </Button>
            </Box>
        </Box>
    );
}
