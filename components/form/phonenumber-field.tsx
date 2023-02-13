import React, { useState, useEffect } from "react";
import { Control, useController } from "react-hook-form";
import {
    TextField,
    TextFieldProps,
    Autocomplete,
    ListItemText,
    Typography,
} from "@mui/material";

import { ICustomer } from "@/models";
import { customersApi } from "@/api-client";
export type IPhoneNumberFieldProps = TextFieldProps & {
    name: string;
    control: Control<any>;
};

export default function PhoneNumberField({
    name,
    control,
    ...rest
}: IPhoneNumberFieldProps) {
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });
    const [options, setOptions] = useState([] as Array<ICustomer>);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await customersApi.getAllCustomer();
            if (!data) {
                setOptions([]);
                return;
            }
            setOptions(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    return (
        <Autocomplete
            size="small"
            fullWidth
            loading={isLoading}
            options={options}
            onChange={(event, newValue) => {
                field.onChange(!newValue ? {} : newValue);
            }}
            isOptionEqualToValue={(option, value) =>
                option._id === value._id || !value._id
            }
            getOptionLabel={(option: ICustomer) =>
                !option || !option.name
                    ? `Chọn khách hàng`
                    : `${option.phonenumber} - ${option.name} `
            }
            renderOption={(props, option: ICustomer) => (
                <ListItemText
                    {...props}
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
            )}
            value={field.value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    fullWidth
                    sx={{ m: 1 }}
                    inputRef={field.ref}
                    error={!!error}
                    helperText={error?.message}
                    {...rest}
                />
            )}
        />
    );
}
