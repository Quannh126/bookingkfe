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
import { useLines } from "@/hooks";
import { ILineForm, NextpageWithLayout } from "../../models";
import React, { useState } from "react";
import { LineForm, TableListLine, LineUpdateForm } from "@/components/lines";
import { ILineDetail } from "@/models";

// import TableListLine from "@/components/Lines/table-list-Lines";
const AdminLines: NextpageWithLayout = () => {
    const [showLineForm, setShowLineForm] = useState(false);
    const [selected, setSelected] = useState({});
    const [showLineUpdateForm, setShowLineUpdateForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowLineForm(false);
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowLineUpdateForm(false);
    };
    const handleEditClick = (data: ILineDetail) => {
        setSelected(data);
        setShowLineUpdateForm(true);
    };

    const hanleRemoveClick = (data: ILineDetail) => {
        setSelected(data);
        setShowAlert(true);
    };

    const { addLines, listLine, removeLine, updateLine } = useLines({
        revalidateOnMount: true,
    });

    async function handleAddLine(data: ILineForm) {
        try {
            await addLines(data);
            setShowLineForm(false);
        } catch (error) {
            console.log("failed to login");
        }
    }
    async function handleDelelteSubmit(data: ILineDetail) {
        try {
            setShowAlert(false);
            await removeLine(data._id!);
        } catch (error) {
            console.log("Remove failse with error", error);
        }
    }

    async function handleUpdateSubmit(data: ILineDetail) {
        try {
            setShowLineUpdateForm(false);
            await updateLine(data);
        } catch (error) {
            console.log("Update failse with error: ", error);
        }
    }

    return (
        <Box>
            <Typography
                component="h1"
                variant="h4"
                p={2}
                className={"labelHeader"}
            >
                Line manager
            </Typography>

            <Button onClick={() => setShowLineForm(true)} variant="outlined">
                Add Line
            </Button>

            <Dialog
                open={showLineForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose}
                maxWidth="lg"
                aria-labelledby="add-Line"
                aria-describedby="add-Line"
            >
                <LineForm
                    onAdd={handleAddLine}
                    onCancel={() => setShowLineForm(false)}
                />
            </Dialog>
            <Dialog
                open={showLineUpdateForm}
                keepMounted={false}
                onClose={handleClose2}
                maxWidth="lg"
                aria-labelledby="update-Line"
                aria-describedby="update-Line"
            >
                <LineUpdateForm
                    initData={selected as ILineDetail}
                    onUpdate={handleUpdateSubmit}
                    activity="Update"
                    onCancel={() => setShowLineUpdateForm(false)}
                />
            </Dialog>
            <Dialog open={showAlert} keepMounted>
                <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Có chắc chắn muốn xoá bản ghi?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAlert(false)}>Huỷ</Button>
                    <Button
                        onClick={() =>
                            handleDelelteSubmit(selected as ILineDetail)
                        }
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {listLine && (
                <TableListLine
                    listLine={listLine}
                    handleEditClick={handleEditClick}
                    handleRemoveClick={hanleRemoveClick}
                />
            )}
        </Box>
    );
};

AdminLines.Layout = AdminLayout;

export default AdminLines;
