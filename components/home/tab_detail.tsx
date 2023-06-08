import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, IconButton } from "@mui/material";
import IBookingTrip from "@/models/Book/book-trip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { showStateType } from "./list_trip_booking";
import Policy from "./Policy1Tab";
import { NameValue } from "@/models";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`trip-tabpanel-${index}`}
            aria-labelledby={`trip-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}
function getName(list: Array<NameValue>, value: String): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i].value === value) {
            return list[i].name;
        }
    }
    return "";
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
export interface TabDetailProp {
    trip_detail?: IBookingTrip;
    listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
    setShowDetail: React.Dispatch<React.SetStateAction<showStateType>>;
}
export default function TabDetailTrip({
    setShowDetail,
    trip_detail,
    listDropoffAndPickUp,
}: TabDetailProp) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", pl: "30px", pr: "30px " }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="detail trip tab"
                >
                    <Tab label="Hình ảnh" {...a11yProps(0)} />
                    <Tab label="Tiện ích" {...a11yProps(1)} />
                    <Tab label="Chính sách" {...a11yProps(2)} />
                    <Tab label="Điểm đón, trả" {...a11yProps(3)} />
                    <IconButton
                        sx={{ marginLeft: "auto", color: "red" }}
                        onClick={() => {
                            setShowDetail({
                                isBook: false,
                                isDetail: false,
                                tripId: "",
                            });
                        }}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Hình ảnh
            </TabPanel>
            <TabPanel value={value} index={1}>
                Tiện ích
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Policy />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Box component="p">
                    <Typography
                        component="span"
                        sx={{ fontSize: "16px", fontWeight: "bold" }}
                    >
                        {`Lưu ý: `}
                    </Typography>
                    <Typography component="span" sx={{ fontSize: "16px" }}>
                        Những điểm đoán trả khách chỉ mang tính đại diện. Khách
                        hàng có thể liên hệ với nhà xe hoặc tài xế để hẹn trước
                        điểm đón thuận lợi
                    </Typography>
                </Box>

                <Grid
                    container
                    sx={{
                        marginTop: "30px",
                        maxHeight: "400px",
                        overflow: "auto",
                    }}
                >
                    <Grid item xs={6}>
                        <Box
                            display="flex"
                            sx={{
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Điểm đón
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    mt: "10px",
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {trip_detail?.departure_time}
                                </Typography>
                                {` • `}
                                <Typography>
                                    {trip_detail?.pickup_point.map((point) => {
                                        return getName(
                                            listDropoffAndPickUp.pickup,
                                            point.district_id +
                                                "-" +
                                                point.point_id
                                        ).split("-")[1];
                                    })}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            display="flex"
                            sx={{
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Điểm trả
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    mt: "10px",
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {trip_detail?.destination_time}
                                </Typography>
                                {` • `}
                                <Typography>
                                    {trip_detail?.dropoff_point.map((point) => {
                                        return getName(
                                            listDropoffAndPickUp.dropoff,
                                            point.district_id +
                                                "-" +
                                                point.point_id
                                        ).split("-")[1];
                                    })}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </TabPanel>
        </Box>
    );
}
