import * as React from "react";
import { Box } from "@mui/system";
import { Avatar, Grid, Typography } from "@mui/material";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import { PureLightTheme } from "@/utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DirectionsBusFilledTwoToneIcon from "@mui/icons-material/DirectionsBusFilledTwoTone";
import CreditCardTwoToneIcon from "@mui/icons-material/CreditCardTwoTone";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
export default function InstructCard() {
    return (
        <Box
            sx={{
                paddingTop: PureLightTheme.spacing(2),
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "24px",
                    lineHeight: "19px",
                    textAlign: "center",
                    color: "#464D5D",
                    marginBottom: PureLightTheme.spacing(2),
                }}
            >
                Các bước dễ dàng để đặt vé
            </Typography>

            <Grid
                container
                sx={{
                    textAlign: "center",
                    display: "flex",
                    mt: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    ".BigIcon.MuiAvatar-root": {
                        border: "2px dashed #238f43",
                        // borderRadius: "100%",
                        color: "#238f43",
                        backgroundColor: "#FDEAD2",
                        height: "70px",
                        width: "70px",
                    },
                    ".smallIcon.MuiAvatar-root": {
                        height: "40px",
                        width: "40px",
                        [PureLightTheme.breakpoints.down("sm")]: {
                            display: "none",
                        },
                    },
                    "&>div": {
                        display: "flex",
                        flexDirection: "column",
                    },
                    "&>.AvatarWrapper": {
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    ".MuiTypography-root": {
                        [PureLightTheme.breakpoints.down("sm")]: {
                            display: "none",
                        },
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "16px",
                        lineHeight: "19px",
                        textAlign: "center",
                        color: "#464D5D",
                        marginTop: "16px",
                    },
                }}
            >
                <Grid item xs={2} className="AvatarWrapper">
                    <Avatar className="BigIcon">
                        <LocationOnTwoToneIcon fontSize="large" />
                    </Avatar>

                    <Typography component="p">
                        Chọn thông tin hành trình và ấn Tìm chuyến
                    </Typography>
                </Grid>
                <Grid item xs={1} sx={{ alignItems: "center" }}>
                    <Avatar className="smallIcon">
                        <ArrowForwardIcon className="smallIcon" />
                    </Avatar>
                </Grid>
                <Grid item xs={2} className="AvatarWrapper">
                    <Avatar className="BigIcon">
                        <DirectionsBusFilledTwoToneIcon fontSize="large" />
                    </Avatar>

                    <Typography component="p">
                        Chọn chuyến, chỗ ngồi phù hợp và điền thông tin
                    </Typography>
                </Grid>
                <Grid item xs={1} sx={{ alignItems: "center" }}>
                    <Avatar className="smallIcon">
                        <ArrowForwardIcon className="smallIcon" />
                    </Avatar>
                </Grid>

                <Grid item xs={2} className="AvatarWrapper">
                    <Avatar className="BigIcon">
                        <CreditCardTwoToneIcon fontSize="large" />
                    </Avatar>

                    <Typography component="p">
                        Tiến hành thanh toán online để giữ chỗ
                    </Typography>
                </Grid>
                <Grid item xs={1} sx={{ alignItems: "center" }}>
                    <Avatar className="smallIcon">
                        <ArrowForwardIcon />
                    </Avatar>
                </Grid>

                <Grid item xs={2} className="AvatarWrapper">
                    <Avatar className="BigIcon">
                        <ConfirmationNumberTwoToneIcon fontSize="large" />
                    </Avatar>

                    <Typography component="p">Nhận mã và lên xe</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
