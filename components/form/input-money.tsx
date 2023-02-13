import * as React from "react";
import { Control, useController } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

export type InputMoneyFieldProps = TextFieldProps & {
    name: string;
    control: Control<any>;
};

export function InputMoneyField({
    name,
    control,
    ...rest
}: InputMoneyFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value.replace(/[^0-9.-]+/g, "")));
    };
    return (
        <TextField
            sx={{ m: 1 }}
            size="small"
            fullWidth
            name={name}
            value={value.toLocaleString()}
            onChange={handleChange}
            onBlur={onBlur}
            error={!!error}
            inputRef={ref}
            helperText={error?.message}
            InputProps={{
                endAdornment: "VNĐ",
            }}
            {...rest}
        />
    );
}
