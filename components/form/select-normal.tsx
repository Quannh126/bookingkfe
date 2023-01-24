import React from "react";

import {
    Select,
    SelectProps,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { KeyValue } from "@/models";
type SelectFieldProps = SelectProps & {
    name: string;
    control: Control<any>;
    allOptions: Array<KeyValue>;
    // eslint-disable-next-line no-unused-vars
};

export function SelectFieldNormal({
    name,
    label,
    control,
    allOptions,
    ...rest
}: SelectFieldProps) {
    const {
        field,
        // fieldState: { error },
    } = useController({
        name,
        control,
    });
    function getKey(value: string, allOptions: Array<KeyValue>) {
        return allOptions.find((item) => item.value === value)?.key;
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="select-label" size="small">
                {label}
            </InputLabel>
            <Select
                size="small"
                fullWidth
                labelId="select-label"
                id="select"
                label={label}
                name={name}
                onChange={(e) => {
                    field.onChange(
                        getKey(e.target.value!.toString(), allOptions)
                    );
                    // onChange;
                    // //console.log(e);
                    // // handleOnChange;
                }}
                inputRef={field.ref}
                {...rest}
            >
                {allOptions.map((item, index) => (
                    <MenuItem key={index} value={item.key}>
                        {item.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
