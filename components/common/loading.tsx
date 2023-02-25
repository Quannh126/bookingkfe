import * as React from "react";
import { Box } from "@mui/system";
import { Backdrop } from "@mui/material";
export default function LoadingPage() {
    return (
        <Box>
            <Backdrop open={true} sx={{ zIndex: 124124 }}>
                {/* <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                > */}
                <Box className="loadingio-spinner-spinner-jzrjum8ltp">
                    <Box className="ldio-tt5pvk4clcd">
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                        <Box></Box>
                    </Box>
                </Box>
                {/* </Box> */}
            </Backdrop>
        </Box>
    );
}
