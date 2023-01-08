import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import {
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import { useCar } from "@/hooks";
import { ICarForm, NextpageWithLayout } from "../../models";
import React, { useState } from "react";
import { CarForm, TableListCar, CarUpdateForm } from "@/components/cars";
import { ICarDetail } from "@/models";

// import TableListCar from "@/components/cars/table-list-cars";
const AdminUses: NextpageWithLayout = () => {
    const [showCarForm, setShowCarForm] = useState(false);
    const [selected, setSelected] = useState({});
    const [showCarUpdateForm, setShowCarUpdateForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowCarForm(false);
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowCarUpdateForm(false);
    };
    const handleEditClick = (data: ICarDetail) => {
        setSelected(data);
        setShowCarUpdateForm(true);
    };

    const hanleRemoveClick = (data: ICarDetail) => {
        setSelected(data);
        setShowAlert(true);
    };

    const { addCars, listCar, removeCar, updateCar, mutate } = useCar({
        revalidateOnMount: true,
    });

    async function handleAddCar(data: ICarForm) {
        try {
            await addCars(data);
            setShowCarForm(false);
        } catch (error) {
            console.log("failed to login");
        }
    }
    async function handleDelelteSubmit(data: ICarDetail) {
        try {
            setShowAlert(false);
            await removeCar(data._id!);
            mutate();
        } catch (error) {
            console.log("Remove failse with error", error);
        }
    }

    async function handleUpdateSubmit(data: ICarDetail) {
        try {
            setShowCarUpdateForm(false);
            await updateCar(data);
            mutate();
        } catch (error) {
            console.log("Update failse with error: ", error);
        }
    }

    return (
        <Box>
            <Typography component="h1" variant="h4" p={2}>
                Trips manager
            </Typography>

            <Button onClick={() => setShowCarForm(true)} variant="outlined">
                Add trip
            </Button>

            <Dialog
                open={showCarForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose}
                maxWidth="lg"
                aria-labelledby="add-trip"
                aria-describedby="add-trip"
            >
                <CarForm
                    onAdd={handleAddCar}
                    onCancel={() => setShowCarForm(false)}
                    activity="Create"
                />
            </Dialog>
            <Dialog
                open={showCarUpdateForm}
                keepMounted={false}
                onClose={handleClose2}
                maxWidth="lg"
                aria-labelledby="update-trip"
                aria-describedby="update-trip"
            >
                <CarUpdateForm
                    initData={selected as ICarDetail}
                    onUpdate={handleUpdateSubmit}
                    activity="Update"
                    onCancel={() => setShowCarUpdateForm(false)}
                />
            </Dialog>
            <Dialog open={showAlert} keepMounted>
                <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAlert(false)}>Huỷ</Button>
                    <Button
                        onClick={() =>
                            handleDelelteSubmit(selected as ICarDetail)
                        }
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {listCar && (
                <TableListCar
                    listCar={listCar}
                    handleEditClick={handleEditClick}
                    handleRemoveClick={hanleRemoveClick}
                />
            )}
        </Box>
    );
};

AdminUses.Layout = AdminLayout;

export default AdminUses;
