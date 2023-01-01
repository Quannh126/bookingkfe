import * as React from "react";
import { Control, useController } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
export type InputFieldProps = TextFieldProps & {
    name: string;
    control: Control<any>;
};

export function InputField({ name, control, ...rest }: InputFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <TextField
            size="small"
            fullWidth
            margin="normal"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!error}
            inputRef={ref}
            helperText={error?.message}
            {...rest}
        />
    );
}
