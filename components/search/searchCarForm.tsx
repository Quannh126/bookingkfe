import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../form";
import { Button, InputAdornment } from "@mui/material";
import { SearchTrip } from "@/models";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export interface SearchCarProps {
    // eslint-disable-next-line no-unused-vars
    onSearch?: (search: SearchTrip) => void;
}
export function SearchCarForm({ onSearch }: SearchCarProps) {
    const { control, handleSubmit } = useForm<SearchTrip>({
        defaultValues: {
            to: "",
            from: "",
            departDate: "",
            // seat: 0,
        },
    });
    function handleSearchCar(searchTrip: SearchTrip) {
        console.log(searchTrip);
        onSearch?.(searchTrip);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleSearchCar)}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px 10px 15px 25px",
                marginBottom: "20px",
                border: "0 1px solid #dfdfdf",
                boxShadow: "0 2px 4px 0 hsla(0, 0%, 71%, 0.5)",
            }}
        >
            <InputField
                type="text"
                name="from"
                control={control}
                label="From"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <LocationOnIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <InputField
                type="text"
                name="to"
                control={control}
                label="To"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <LocationOnIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <InputField
                id="date"
                label="Depart Date"
                type="date"
                name="departDate"
                InputLabelProps={{
                    shrink: true,
                }}
                control={control}
                // InputProps={{
                //     inputProps: { min: Date.now.toString() },
                // }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    ml: 2,
                    mt: 2,
                    mb: 1,
                }}
            >
                Search
            </Button>
        </Box>
    );
}
