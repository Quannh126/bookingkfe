import * as React from "react";
import { Box } from "@mui/system";
export interface IHeaderMobiProps {}

export default function HeaderMobi(props: IHeaderMobiProps) {
    return <Box display={{ xs: "block", md: "none" }}>Header</Box>;
}
