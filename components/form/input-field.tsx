import * as React from "react";
import { Control, useController } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

export type InputFieldProps = TextFieldProps & {
    name: string;
    control: Control<any>;
};

export function InputField({
    name,
    control,
    onChange: externalOnChange,
    // eslint-disable-next-line no-unused-vars
    onBlur: externalOnBlur,
    // ref: externalRef,

    // value: externalValue,
    ...rest
}: InputFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <TextField
            sx={{ m: 1 }}
            size="small"
            fullWidth
            name={name}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                externalOnChange?.(event);
            }}
            onBlur={onBlur}
            error={!!error}
            inputRef={ref}
            helperText={error?.message}
            {...rest}
        />
    );
}
