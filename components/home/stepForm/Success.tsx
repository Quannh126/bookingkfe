import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
export default function Success() {
    return (
        <Box
            sx={{
                padding: "30px",

                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            <Typography variant="h4" align="center" sx={{ py: 4 }}>
                Cảm ơn bạn đã đặt vé
            </Typography>
            <Typography component="p" align="center">
                Thông tin vé sẽ được gửi tới email của bạn
            </Typography>
        </Box>
    );
}
