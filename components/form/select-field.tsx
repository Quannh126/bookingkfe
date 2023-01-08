import React, { useState, useMemo } from "react";

import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    ListSubheader,
    TextField,
    SelectProps,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Control, useController } from "react-hook-form";
import { KeyValue } from "@/models";
export type SelectFieldProps = SelectProps & {
    name: string;
    control: Control<any>;
    allOptions: Array<KeyValue>;
};

export function SelectField({
    name,
    label,
    control,
    allOptions,
    ...rest
}: SelectFieldProps) {
    const {
        field: { onChange, value },
        // fieldState: { error },
    } = useController({
        name,
        control,
    });
    const containsText = (text: string, searchText: string) =>
        text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

    const [selectedOption, setSelectedOption] = useState(value);

    function getKey(value: string, allOptions: Array<KeyValue>) {
        return allOptions.find((item) => item.value === value)?.key;
    }
    const [searchText, setSearchText] = useState("");
    const displayedOptions = useMemo(
        () =>
            allOptions!.filter((option) =>
                containsText(option.value, searchText)
            ),
        [allOptions, searchText]
    );
    // function handleOnChangeSelect(e: any) {
    //     setSelectedOption(e.target.value);
    //     console.log(e.target);
    //     onChange(e.target.value);
    // }

    return (
        <FormControl fullWidth>
            <InputLabel
                id="search-select-label"
                className="mui-style-vbyadn-MuiFormLabel-root-MuiInputLabel-root"
            >
                {label}
            </InputLabel>
            <Select
                fullWidth
                size="small"
                // name={name}
                MenuProps={{ autoFocus: false }}
                labelId="search-select-label"
                id="search-select"
                value={selectedOption}
                label={label}
                name={name}
                onChange={(e) => {
                    setSelectedOption(e.target.value);

                    onChange(getKey(e.target.value, allOptions));
                    console.log(e);
                }}
                onClose={() => setSearchText("")}
                renderValue={() => selectedOption}
                {...rest}
            >
                <ListSubheader>
                    <TextField
                        autoFocus
                        placeholder="Type to search..."
                        size="small"
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                                e.stopPropagation();
                            }
                        }}
                    />
                </ListSubheader>
                {displayedOptions &&
                    displayedOptions.map((option) => (
                        <MenuItem key={option!.key} value={option!.value}>
                            {option.value}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}
