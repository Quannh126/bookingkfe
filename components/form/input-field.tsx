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
        // fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <TextField
            size="small"
            margin="normal"
            sx={{ ml: 2 }}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            {...rest}
        />
    );
}
