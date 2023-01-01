import * as React from "react";
import { Box } from "@mui/system";
export interface IHeaderMobiProps {}

// eslint-disable-next-line no-unused-vars
export default function HeaderMobi(props: IHeaderMobiProps) {
    return <Box display={{ xs: "block", md: "none" }}>Header</Box>;
}
