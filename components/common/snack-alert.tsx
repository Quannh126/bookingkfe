import React, { useState } from "react";
import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export interface AlertContentProp {
    content: string;
    typeAlert?: "error" | "info" | "success" | "warning";
    openInit: boolean;
}
export function SnackAlert({ content, typeAlert, openInit }: AlertContentProp) {
    const [open, setOpen] = useState(openInit);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={!typeAlert ? "info" : typeAlert}
                    sx={{ width: "100%" }}
                >
                    {content}
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    );
}
