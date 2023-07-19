import React from "react";
import { Control, useController } from "react-hook-form";
import {
    TextField,
    TextFieldProps,
    ListItemText,
    Typography,
    MenuItem,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { SWRResponse } from "swr";
import { ICustomer } from "@/models";
// import { customersApi } from "@/api-client";
export type IPhoneNumberFieldProps = TextFieldProps & {
    optionsData: SWRResponse<ICustomer[], Error>;
    name: string;
    control: Control<any>;
};
const filter = createFilterOptions<ICustomer>();
export default function PhoneNumberField({
    name,
    control,
    disabled,
    optionsData,
    ...rest
}: IPhoneNumberFieldProps) {
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });
    // const [options, setOptions] = useState([] as Array<ICustomer>);
    // const [isLoading, setIsLoading] = useState(false);

    return (
        <Autocomplete
            size="small"
            fullWidth
            freeSolo
            disabled={disabled}
            clearOnBlur
            handleHomeEndKeys
            loading={optionsData.isLoading}
            options={optionsData.data ?? []}
            onChange={(event, newValue) => {
                if (!newValue) {
                    field.onChange("");
                } else if (newValue && newValue.inputValue) {
                    field.onChange(newValue.inputValue);
                } else {
                    field.onChange(newValue.phonenumber);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                    (option) => inputValue === option.phonenumber
                );
                if (inputValue !== "" && !isExisting) {
                    filtered.push({
                        name: "Khách mới",
                        email: "",
                        _id: "",
                        phonenumber: `${inputValue}`,
                    });
                }

                return filtered;
            }}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === "string") {
                    return option === value;
                } else if (typeof option === "object") {
                    return (
                        option.phonenumber === (value as ICustomer).phonenumber
                    );
                } else {
                    return true;
                }
            }}
            getOptionLabel={(option) => {
                if (typeof option === "string") {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.phonenumber;
            }}
            renderOption={(props, option: ICustomer) =>
                typeof option !== "string" && (
                    <MenuItem {...props}>
                        <ListItemText
                            primary={option.phonenumber.toString()}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        style={{ display: "inline" }}
                                    >
                                        {option.name}
                                    </Typography>
                                </React.Fragment>
                            }
                            sx={{
                                flexDirection: "column",
                                alignItems: "normal !important",
                            }}
                        />
                    </MenuItem>
                )
            }
            value={field.value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    fullWidth
                    disabled={disabled}
                    // inputRef={field.ref}
                    error={!!error}
                    helperText={error?.message}
                    //onChange={field.onChange}
                    {...rest}
                />
            )}
        />
    );
}
