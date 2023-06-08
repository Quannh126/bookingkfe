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
    SelectChangeEvent,
    FormHelperText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Control, useController } from "react-hook-form";
import { NameValue } from "@/models";
export type SelectFieldProps = SelectProps & {
    name: string;
    control: Control<any>;
    allOptions: Array<NameValue> | [];
    // eslint-disable-next-line no-unused-vars
    handleOnChange?: (e: SelectChangeEvent) => void;
};

export function SelectField({
    name,
    label,
    control,
    allOptions,
    // handleOnChange,

    ...rest
}: SelectFieldProps) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const containsText = (text: string, searchText: string) =>
        text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

    const [selectedOption, setSelectedOption] = useState(field.value);

    // function getKey(name: string, allOptions: Array<NameValue>) {
    //     return allOptions.find((item) => item.name === name)?.value;
    // }
    const [searchText, setSearchText] = useState("");
    const displayedOptions = useMemo(
        () =>
            allOptions!.filter((option) =>
                containsText(
                    option.name
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, ""),
                    searchText
                )
            ),
        [allOptions, searchText]
    );
    // function handleOnChangeSelect(e: any) {
    //     setSelectedOption(e.target.value);
    //     //console.log(e.target);
    //     onChange(e.target.value);
    // }

    return (
        <FormControl fullWidth>
            <InputLabel id="search-select-label" size="small">
                {label}
            </InputLabel>
            <Select
                fullWidth
                size="small"
                MenuProps={{ autoFocus: false }}
                labelId="search-select-label"
                id="search-select"
                defaultValue={selectedOption}
                value={selectedOption}
                label={label}
                name={field.name}
                onChange={(e) => {
                    setSelectedOption(e.target.value!.toString());
                    field.onChange(e.target.value!.toString());

                    ////console.log(e);
                    // handleOnChange;
                    // field.onChange(
                    //     //getKey(e.target.value!.toString(), allOptions)
                    //     e.target.value
                    // );
                }}
                onClose={() => setSearchText("")}
                //renderValue={() => selectedOption}
                {...rest}
            >
                <ListSubheader>
                    <TextField
                        autoFocus
                        fullWidth
                        placeholder="Type to search..."
                        size="small"
                        margin="normal"
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
                <MenuItem value={undefined}></MenuItem>
                {displayedOptions &&
                    displayedOptions.map((option, index) => (
                        <MenuItem key={index} value={option!.value}>
                            {option.name}
                        </MenuItem>
                    ))}
            </Select>
            {error && <FormHelperText error>{error?.message}</FormHelperText>}
        </FormControl>
    );
}
