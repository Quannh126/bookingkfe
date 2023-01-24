import { KeyValue } from "@/models";
import * as React from "react";
import { Box } from "@mui/system";
import ReactSelect from "react-select";
export interface IFilterBarProps {
    trip?: Array<KeyValue>;
    route?: Array<KeyValue>;
    jourenyDate?: Date;
}
const data = [1, 2, 3, 4];
export default function FilterBar({
    trip,
    route,
    jourenyDate,
}: IFilterBarProps) {
    return (
        <Box
            sx={{
                display: "flex",

                padding: "15px 0px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    marginRight: "10px",
                }}
            >
                <ReactSelect
                    isClearable
                    placeholder="Chọn tuyến - "
                    options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" },
                    ]}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    marginRight: "10px",
                }}
            >
                <ReactSelect
                    isClearable
                    placeholder="Chọn chuyến - "
                    options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" },
                    ]}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    marginRight: "10px",
                }}
            >
                <ReactSelect
                    isClearable
                    placeholder="Chọn bến lên - "
                    options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" },
                    ]}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    marginRight: "10px",
                }}
            >
                <ReactSelect
                    isClearable
                    placeholder="Chọn bến xuống - "
                    options={[
                        { value: "chocolate", label: "Chocolate" },
                        { value: "strawberry", label: "Strawberry" },
                        { value: "vanilla", label: "Vanilla" },
                    ]}
                />
            </Box>
        </Box>
    );
}
