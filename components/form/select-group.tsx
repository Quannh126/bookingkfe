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
    CircularProgress,
    ListSubheader,
    ListSubheaderProps,
    // CircularProgress,
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { ILocationGrouped } from "@/models";
type SelectFieldProps = SelectProps & {
    name: string;
    control: Control<any>;
    allOptions: Array<ILocationGrouped> | [];
    cssFormControll?: SxProps<Theme>;
    isLoading?: boolean;
};

function MyListSubheader(props: ListSubheaderProps) {
    return <ListSubheader {...props} />;
}

MyListSubheader.muiSkipListHighlight = true;
export default MyListSubheader;

export function SelectFieldGroup({
    name,
    label,
    control,
    allOptions,
    cssFormControll,
    isLoading,
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

    if (isLoading) {
        return <CircularProgress />;
    }
    return (
        <FormControl fullWidth sx={cssFormControll}>
            <InputLabel id={`select-labe${name}`} size="small">
                {label}
            </InputLabel>
            <Select
                size="small"
                labelId={`select-labe${name}`}
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
                    <React.Fragment key={index}>
                        <MyListSubheader>{item.header}</MyListSubheader>
                        {item.point.map((item, itemIndex) => (
                            <MenuItem key={itemIndex} value={item.code_group}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </React.Fragment>
                ))}
            </Select>
            {error && <FormHelperText error>{error?.message}</FormHelperText>}
        </FormControl>
    );
}
