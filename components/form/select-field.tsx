import * as React from "react";
import { Control, useController } from "react-hook-form";
import { Select, SelectProps } from "@mui/material";
export type SelectFieldProps = SelectProps & {
    name: string;
    control: Control<any>;
};

export function SelectField({
    name,
    control,
    children,
    ...rest
}: SelectFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        // fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <Select
            size="small"
            margin="dense"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            {...rest}
        >
            {children}
        </Select>
    );
}
