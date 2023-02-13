import * as React from "react";
import { Control, useController } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export type DateTimerFieldProps = TextFieldProps & {
    name: string;
    control: Control<any>;
};

export function DatePickerField({
    name,
    control,
    label,
    disabled,

    ...rest
}: DateTimerFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                disabled={disabled}
                label={label}
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        sx={{ m: 1 }}
                        size="small"
                        fullWidth
                        name={name}
                        onBlur={onBlur}
                        error={!!error}
                        inputRef={ref}
                        helperText={error?.message}
                        {...rest}
                        {...params}
                    />
                )}
            />
        </LocalizationProvider>
    );
}
