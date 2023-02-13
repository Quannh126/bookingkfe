import * as React from "react";
import { Box } from "@mui/system";
export default function LoadingPage() {
    return (
        <>
            <Box
                component="img"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                }}
                src="https://res.cloudinary.com/dhsmam1yc/image/upload/v1675589764/MyImg/Spinner-1s-200px_sgnprc.gif"
                alt=""
                className="spinner"
            />
        </>
    );
}
