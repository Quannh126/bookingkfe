import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import { TextFieldProps } from "@mui/material";

// import {
//     DatePicker,
//     // DesktopDatePicker,
//     LocalizationProvider,
// } from "@mui/x-date-pickers";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export type DateTimerFieldProps = TextFieldProps & {
    name: string;
    disablePast?: boolean;
    isDisable?: boolean;
    control: Control<any>;
};

export function DatePickerField({
    name,
    control,
    isDisable,
    label,
    disablePast,
    ...rest
}: DateTimerFieldProps) {
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
            <DatePicker
                label={label}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                disablePast={disablePast}
                format="DD/MM/YYYY"
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
                }}
            />
        </LocalizationProvider>
    );
}
