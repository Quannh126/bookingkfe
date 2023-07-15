import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
// import {
//     DatePicker,
//     // DesktopDatePicker,
//     LocalizationProvider,
// } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";

export type TimerFieldProps = TextFieldProps & {
    name: string;
    disablePast?: boolean;
    isDisable?: boolean;
    control: Control<any>;
};

export function TimerField({
    name,
    control,
    isDisable,
    label,
    disablePast,
    ...rest
}: TimerFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const [open, setOpen] = useState(false);
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
                label={label}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                disablePast={disablePast}
                views={["hours", "minutes"]}
                value={moment(value)}
                onChange={onChange}
                slotProps={{
                    textField: {
                        size: "small",
                        fullWidth: true,
                        name: name,
                        error: !!error,
                        disabled: isDisable,
                        onBlur: onBlur,
                        ref: ref,
                        ...rest,
                    },
                    openPickerButton: {
                        onClick: () => setOpen(true),
                        size: "small",
                        disabled: isDisable,
                    },
                    desktopPaper: {
                        sx: {
                            ".MuiList-root": {
                                "::-webkit-scrollbar": {
                                    display: "none",
                                },
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
}
