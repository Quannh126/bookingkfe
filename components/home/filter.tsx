import * as React from "react";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
interface IFilterProp {
    // eslint-disable-next-line no-unused-vars
    onChangeCarType: (val: string) => void;
    // eslint-disable-next-line no-unused-vars
    onChangeCapacity: (val: string) => void;
}

export default function FilterCard({
    onChangeCarType,
    onChangeCapacity,
}: IFilterProp) {
    const [checkedCapacity, setCheckedCapacity] = React.useState([true, false]);

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedCapacity([event.target.checked, event.target.checked]);
        onChangeCarType("");
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedCapacity([event.target.checked, checkedCapacity[1]]);
        onChangeCarType("Giường nằm");
    };

    const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedCapacity([checkedCapacity[0], event.target.checked]);
        onChangeCarType("Xe thường");
    };

    const children1 = (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            <FormControlLabel
                label="Xe giường nằm"
                control={
                    <Checkbox
                        checked={checkedCapacity[0]}
                        onChange={handleChange2}
                    />
                }
            />
            <FormControlLabel
                label="Xe ghế ngồi"
                control={
                    <Checkbox
                        checked={checkedCapacity[1]}
                        onChange={handleChange3}
                    />
                }
            />
        </Box>
    );
    const children2 = (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            <FormControlLabel
                label="21 chỗ"
                control={
                    <Checkbox
                        checked={checkedCapacity[0]}
                        onChange={handleChange2}
                    />
                }
            />
            <FormControlLabel
                label="45 chỗ"
                control={
                    <Checkbox
                        checked={checkedCapacity[1]}
                        onChange={handleChange3}
                    />
                }
            />
        </Box>
    );
    return (
        <Box>
            <FormControlLabel
                label="Capacity"
                control={
                    <Checkbox
                        checked={checkedCapacity[0] && checkedCapacity[1]}
                        indeterminate={
                            checkedCapacity[0] !== checkedCapacity[1]
                        }
                        onChange={handleChange1}
                    />
                }
            />
            {children1}

            <FormControlLabel
                label="Capacity"
                control={
                    <Checkbox
                        checked={checkedCapacity[0] && checkedCapacity[1]}
                        indeterminate={
                            checkedCapacity[0] !== checkedCapacity[1]
                        }
                        onChange={handleChange1}
                    />
                }
            />
            {children2}
        </Box>
    );
}
