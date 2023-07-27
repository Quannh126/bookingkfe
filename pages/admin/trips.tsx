// import AdminLayout from "@/components/layout/admin";

import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    DialogTitle,
    Container,
    // Typography,
} from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import { useTrip } from "@/hooks";
import { NameValue, NextpageWithLayout } from "@/models";
import React, { useState } from "react";
import { TripForm, TripFormUpdate } from "@/components/trips";
import { ITripForm } from "@/models/Trips/trip-form";
// import { locationApi } from "@/api-client";
import { TableListTrips } from "@/components/trips/table-list-trips";
import useSWR, { SWRConfiguration } from "swr";
import SidebarLayout from "@/components/layout/SidebarLayout";
// import TableListCar from "@/components/cars/table-list-cars";
// import { useRouter } from "next/router";
import LoadingPage from "@/components/common/loading";
import Head from "next/head";
import { PureLightTheme } from "@/utils";
const AdminTrips: NextpageWithLayout = () => {
    const [showTripForm, setShowTripForm] = useState(false);
    const [selected, setSelected] = useState({});
    const [showCarUpdateForm, setShowTripUpdateForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { addTrip, listTrips, updateTrip, removeTrip, isLoading } = useTrip();
    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowTripForm(false);
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowTripUpdateForm(false);
    };
    const handleEditClick = (data: ITripForm) => {
        setSelected(data);
        setShowTripUpdateForm(true);
    };

    const handleRemoveClick = (data: ITripForm) => {
        setSelected(data);
        setShowAlert(true);
    };

    async function handleAddTrip(data: ITripForm) {
        try {
            await addTrip(data);
            setShowTripForm(false);
        } catch (error) {
            // console.log("Add error", error);
        }
    }
    async function handleDeleteSubmit(data: ITripForm) {
        try {
            setShowAlert(false);
            await removeTrip(data._id!);
        } catch (error) {
            console.log("Remove error: ", error);
        }
    }

    async function handleUpdateSubmit(data: ITripForm) {
        try {
            setShowTripUpdateForm(false);
            await updateTrip(data);
        } catch (error) {
            console.log("Update error: ", error);
        }
    }
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };

    const listProvince = useSWR<Array<NameValue> | [], Error>(
        `/locations/options`,
        null,
        config
    );
    if (isLoading || !listProvince) return <LoadingPage />;
    return (
        <>
            <Head>
                <title>Lập lịch chạy</title>
            </Head>
            <Container
                maxWidth="lg"
                sx={{
                    marginTop: PureLightTheme.spacing(2),
                    marginBottom: PureLightTheme.spacing(2),
                }}
            >
                <TableListTrips
                    listProvince={!listProvince.data ? [] : listProvince.data}
                    listTrips={listTrips}
                    handleEditClick={handleEditClick}
                    handleRemoveClick={handleRemoveClick}
                    setShowTripForm={setShowTripForm}
                />
            </Container>
            <Dialog open={showAlert} keepMounted>
                <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc muốn xoá thông tin bản ghi không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAlert(false)}>Huỷ</Button>
                    <Button
                        onClick={() =>
                            handleDeleteSubmit(selected as ITripForm)
                        }
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>

            {showTripForm && (
                <TripForm
                    showAddTripForm={showTripForm}
                    handleClose={handleClose}
                    onAdd={handleAddTrip}
                    onCancel={() => setShowTripForm(false)}
                    configProvince={listProvince.data!}
                />
            )}

            {showCarUpdateForm && (
                <TripFormUpdate
                    data={selected as ITripForm}
                    onUpdate={handleUpdateSubmit}
                    onCancel={() => setShowTripUpdateForm(false)}
                    configProvince={listProvince.data!}
                    showCarUpdateForm={showCarUpdateForm}
                    handleClose2={handleClose2}
                />
            )}
        </>
    );
};

AdminTrips.Layout = SidebarLayout;

export default AdminTrips;
