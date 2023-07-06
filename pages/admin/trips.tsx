// import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    DialogTitle,
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
const AdminTrips: NextpageWithLayout = () => {
    const [showTripForm, setShowTripForm] = useState(false);
    const [selected, setSelected] = useState({});
    const [showCarUpdateForm, setShowTripUpdateForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { addTrip, listTrips, updateTrip, removeTrip } = useTrip();
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
            console.log("Add error", error);
        }
    }
    async function handleDelelteSubmit(data: ITripForm) {
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
    // useEffect(() => {
    //     async function fetchData() {
    //         const listProvince = await locationApi.getListProvince();
    //         // const list: Array<NameValue> = listLocation as Array<NameValue>
    //         setListProvince(listProvince);
    //     }
    //     fetchData();
    // }, []);
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

    return (
        <Box p={2}>
            <Dialog open={showAlert} keepMounted>
                <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc xoá thông tin bản ghi không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAlert(false)}>Huỷ</Button>
                    <Button
                        onClick={() =>
                            handleDelelteSubmit(selected as ITripForm)
                        }
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showTripForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose}
                aria-labelledby="add-trip"
                aria-describedby="add-trip"
                scroll={"paper"}
            >
                <TripForm
                    onAdd={handleAddTrip}
                    onCancel={() => setShowTripForm(false)}
                    configProvince={listProvince.data!}
                />
            </Dialog>
            <TripFormUpdate
                data={selected as ITripForm}
                onUpdate={handleUpdateSubmit}
                onCancel={() => setShowTripUpdateForm(false)}
                configProvince={listProvince.data!}
                showCarUpdateForm={showCarUpdateForm}
                handleClose2={handleClose2}
            />
            {/* <Dialog
                open={showCarUpdateForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose2}
                aria-labelledby="update-trip"
                aria-describedby="update-trip"
                scroll={"paper"}
            >
                <DialogTitle id="update-trip">Cập nhật lịch chạy</DialogTitle>
                <DialogContent dividers={true}>
                    <TripFormUpdate
                        data={selected as ITripForm}
                        onUpdate={handleUpdateSubmit}
                        onCancel={() => setShowTripUpdateForm(false)}
                        configProvince={listProvince.data!}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog> */}
            <TableListTrips
                listProvince={!listProvince.data ? [] : listProvince.data}
                listTrips={listTrips}
                handleEditClick={handleEditClick}
                handleRemoveClick={handleRemoveClick}
                setShowTripForm={setShowTripForm}
            />
        </Box>
    );
};

AdminTrips.Layout = SidebarLayout;

export default AdminTrips;
