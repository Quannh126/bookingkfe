import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
} from "@mui/material";
export interface IAlertDialogProps {
    alertText: String;
    onAgree: () => void;
    isOpen: boolean;
}

export default function AlertDialog({
    alertText,
    onAgree,
    isOpen,
}: IAlertDialogProps) {
    const [openDialog, setOpenDialog] = useState(isOpen);
    return (
        <Dialog open={openDialog} keepMounted>
            <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Huỷ</Button>
                <Button
                    onClick={() => {
                        onAgree;
                        setOpenDialog(false);
                    }}
                    autoFocus
                >
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
}
