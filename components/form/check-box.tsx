import * as React from "react";
import { Control, useController } from "react-hook-form";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

export type MyCheckBoxProps = CheckboxProps & {
    name: string;
    label: string;
    control: Control<any>;
};

export function MyCheckBox({ name, label, control, ...rest }: MyCheckBoxProps) {
    const {
        field: { onChange, onBlur, value, ref },
    } = useController({
        name,
        control,
    });
    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                        {...rest}
                        size="small"
                    />
                }
                label={label}
            />
        </>
    );
}
