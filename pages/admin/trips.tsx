import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import { Button, Typography, Dialog } from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import { useTrip } from "@/hooks";
import { KeyValue, NextpageWithLayout } from "@/models";
import React, { useEffect, useState } from "react";
import { TripForm } from "@/components/trips";

import { ITripForm } from "@/models/Trips/trip-form";
import { locationApi } from "@/api-client";
import { TableListTrips } from "@/components/trips/table-list-trips";
import FilterBar from "@/components/trips/filter_bar";

// import TableListCar from "@/components/cars/table-list-cars";
const AdminTrips: NextpageWithLayout = () => {
    const [showTripForm, setShowTripForm] = useState(false);

    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowTripForm(false);
    };

    const { addTrip, listTrips } = useTrip();
    const [configProvince, setListProvince] = useState([] as Array<KeyValue>);

    async function handleAddTrip(data: ITripForm) {
        try {
            await addTrip(data);
            setShowTripForm(false);
        } catch (error) {
            console.log("failed to login");
        }
    }

    useEffect(() => {
        async function fetchData() {
            const listProvince = await locationApi.getListProvince();
            // const list: Array<KeyValue> = listLocation as Array<KeyValue>
            setListProvince(listProvince);
        }
        fetchData();
    }, []);
    return (
        <Box p={2}>
            <Typography component="h1" variant="h4">
                Trips manager
            </Typography>

            <Button onClick={() => setShowTripForm(true)} variant="outlined">
                Add trip
            </Button>
            <FilterBar />
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
                    configProvince={configProvince}
                />
            </Dialog>

            <TableListTrips />
        </Box>
    );
};

AdminTrips.Layout = AdminLayout;

export default AdminTrips;
