import * as React from "react";
import { Box } from "@mui/system";

export interface IAddTripsFormProps {
    onAdd?: (data: ICarForm) => void;
    onCancel: () => void;
    activity: string;
}
// eslint-disable-next-line no-unused-vars
export default function AddTripsForm(props: IAddTripsFormProps) {
    return <Box></Box>;
}
