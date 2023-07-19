import { MouseEvent, useState } from "react";
import {
    // Button,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Card,
    Typography,
    // styled,
    Tooltip,
    // Divider,
} from "@mui/material";
// import ViewWeekTwoToneIcon from "@mui/icons-material/ViewWeekTwoTone";
// import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone";

import ChartOfWeek from "./ChartOfWeek";
import ChartOfMonth from "./ChartOfMonth";
import ChartOfYear from "./ChartOfYear";
// const EmptyResultsWrapper = styled("img")(
//     ({ theme }) => `
//       max-width: 100%;
//       width: ${theme.spacing(66)};
//       height: ${theme.spacing(34)};
// `
// );

function ChartComponents() {
    const [tabs, setTab] = useState<string | null>("watch_week");

    const handleViewOrientation = (
        _event: MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        setTab(newValue);
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pb: 3,
                }}
            >
                <Typography variant="h3">Doanh số</Typography>
                <ToggleButtonGroup
                    value={tabs}
                    exclusive
                    onChange={handleViewOrientation}
                >
                    <ToggleButton disableRipple value="watch_week">
                        <Tooltip title="Tuần" placement="left">
                            <Box>W</Box>
                        </Tooltip>
                    </ToggleButton>

                    <ToggleButton disableRipple value="watch_month">
                        <Tooltip title="Tháng" placement="top">
                            <Box>M</Box>
                        </Tooltip>
                    </ToggleButton>

                    <ToggleButton disableRipple value="watch_year">
                        <Tooltip title="Năm" placement="right">
                            <Box>Y</Box>
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {tabs === "watch_month" && <ChartOfMonth />}

            {tabs === "watch_week" && <ChartOfWeek />}
            {tabs === "watch_year" && <ChartOfYear />}
            {!tabs && (
                <Card
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Typography
                        align="center"
                        variant="h2"
                        fontWeight="normal"
                        color="text.secondary"
                        sx={{
                            mt: 3,
                        }}
                        gutterBottom
                    ></Typography>
                </Card>
            )}
        </>
    );
}

export default ChartComponents;
