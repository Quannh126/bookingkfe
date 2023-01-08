import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import { Button, Typography, Dialog } from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import { useTrip } from "@/hooks";
import { KeyValue, NextpageWithLayout } from "@/models";
import React, { useEffect, useState } from "react";
import { TripForm } from "@/components/trips";

import { ITripForm } from "@/models/Trips/trip-form";
import { carsApi } from "@/api-client";
import { TableListTrips } from "@/components/trips/table-list-trips";

// import TableListCar from "@/components/cars/table-list-cars";
const AdminTrips: NextpageWithLayout = () => {
    const [showTripForm, setShowTripForm] = useState(false);

    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowTripForm(false);
    };

    const { addTrip } = useTrip();
    const [allOptions, setAllOptions] = useState(Array<KeyValue>);

    async function handleAddTrip(carid: string, data: ITripForm) {
        try {
            await addTrip(carid, data);
            setShowTripForm(false);
        } catch (error) {
            console.log("failed to login");
        }
    }
    useEffect(() => {
        async function fetchData() {
            const res = await carsApi.getListNameCars();

            //const list: Array<KeyValue> = res as Array<KeyValue>
            setAllOptions(res);
        }
        fetchData();
    }, []);
    return (
        <Box>
            <Typography component="h1" variant="h4" p={2}>
                Trips manager
            </Typography>

            <Button onClick={() => setShowTripForm(true)} variant="outlined">
                Add trip
            </Button>

            <Dialog
                open={showTripForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose}
                maxWidth="lg"
                aria-labelledby="add-trip"
                aria-describedby="add-trip"
            >
                <TripForm
                    onAdd={handleAddTrip}
                    onCancel={() => setShowTripForm(false)}
                    allOptions={allOptions}
                />
            </Dialog>

            <TableListTrips listTrips="asd" />
        </Box>
    );
};

AdminTrips.Layout = AdminLayout;

export default AdminTrips;
