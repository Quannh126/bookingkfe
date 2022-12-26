import * as React from "react";
import { Box } from "@mui/system";
export default function LoadingPage() {
    return (
        <>
            <Box
                component="img"
                sx={{
                    width: "80%",
                    height: "30vh",
                }}
                src="img/spinner.gif"
                alt=""
                className="spinner"
            />
        </>
    );
}
