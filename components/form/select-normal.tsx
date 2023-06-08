import React, { useState } from "react";

import {
    Select,
    SelectProps,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    SxProps,
    Theme,
    // CircularProgress,
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { NameValue } from "@/models";
type SelectFieldProps = SelectProps & {
    name: string;
    control: Control<any>;
    allOptions: Array<NameValue> | [];
    cssFormControll?: SxProps<Theme>;
    // isLoading?: boolean;
};

export function SelectFieldNormal({
    name,
    label,
    control,
    allOptions,
    cssFormControll,
    // isLoading,
    ...rest
}: SelectFieldProps) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    const [selectedOption, setSelectedOption] = useState(value);
    // function getKey(value: string, allOptions: Array<NameValue>) {
    //     return allOptions.find((item) => item.value === value)?.key;
    // }
    // if (isLoading) {
    //     return <CircularProgress />;
    // }
    return (
        <FormControl fullWidth sx={cssFormControll}>
            <InputLabel id="select-label" size="small">
                {label}
            </InputLabel>
            <Select
                size="small"
                labelId="select-label"
                fullWidth
                label={label}
                name={name}
                inputRef={ref}
                value={selectedOption}
                onBlur={onBlur}
                error={!!error}
                onChange={(e) => {
                    setSelectedOption(e.target.value);
                    onChange(e.target.value);
                }}
                {...rest}
            >
                {allOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText error>{error?.message}</FormHelperText>}
        </FormControl>
    );
}
