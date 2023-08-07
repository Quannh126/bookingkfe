import {
    // Button,
    Card,
    Box,
    Grid,
    Typography,
    useTheme,
    styled,
    // Avatar,
    Divider,
    alpha,
    ListItem,
    ListItemText,
    List,
    ListItemAvatar,
    Skeleton,
    CircularProgress,
} from "@mui/material";
// import TrendingUp from "@mui/icons-material/TrendingUp";
import Text from "@/components/Text";
import { Chart } from "@/components/Chart";
import type { ApexOptions } from "apexcharts";
import { Circle } from "@mui/icons-material";
import useSWR, { SWRConfiguration } from "swr";
import LoadingPage from "@/components/common/loading";
// import { NameValue } from "@/models";
const Red = "#FF1E00";
const Green = "#59CE8F";
const Blue = "#5569ff";

// const AvatarSuccess = styled(Avatar)(
//     ({ theme }) => `
//       background-color: ${theme.colors.success.main};
//       color: ${theme.palette.success.contrastText};
//       width: ${theme.spacing(8)};
//       height: ${theme.spacing(8)};
//       box-shadow: ${theme.colors.shadows.success};
// `
// );

const ListItemAvatarWrapper = styled(ListItemAvatar)(
    ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
      theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[30]
          : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);
const caculatorPerCent = (arr: Array<number>, index: number) => {
    if (arr.length == 0 || index < 0) return "";
    const total = arr.reduce((s, val) => s + val, 0);
    const percent = ((arr[index] / total) * 100).toFixed(0);
    return percent + "%";
};

function DonutOfDay() {
    const theme = useTheme();

    const chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "60%",
                },
            },
        },
        colors: [Blue, Green, Red],
        dataLabels: {
            enabled: true,
            formatter: (value) => {
                if (typeof value == "object") {
                    return "[]";
                }

                const number =
                    typeof value == "string" ? parseFloat(value) : value;
                const percent = number.toFixed(1);
                return percent + "%";
            },
            style: {
                colors: [theme.colors.alpha.trueWhite[100]],
            },
            background: {
                enabled: true,
                foreColor: theme.colors.alpha.trueWhite[100],
                padding: 8,
                borderRadius: 4,
                borderWidth: 0,
                opacity: 0.3,
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: theme.colors.alpha.black[70],
                    opacity: 0.5,
                },
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: theme.colors.alpha.black[50],
                opacity: 0.5,
            },
        },
        fill: {
            opacity: 1,
        },
        labels: ["Vé chưa thanh toán", "Vé đã thanh toán", "Vé đã bị huỷ"],
        legend: {
            labels: {
                colors: theme.colors.alpha.trueWhite[100],
            },
            show: false,
        },
        stroke: {
            width: 0,
        },
        theme: {
            mode: theme.palette.mode,
        },
    };

    // const chartSeries = [60, 35, 5];
    // const chartSeries2 = [12, 4, 5];
    const chartOptions2 = {
        ...chartOptions,
        labels: ["Xe đang hoạt động", "Xe chờ đặt lịch", "Xe đang bảo dưỡng"],
    };

    const config: SWRConfiguration = {
        dedupingInterval: 2 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: true,
        refreshWhenHidden: true,
    };
    const { data: chartSeries2, isLoading: isLoadingCarData } = useSWR<
        Array<number> | [],
        Error
    >(`/cars/getDonutData`, null, config);
    const { data: chartSeries, isLoading: isLoadingBookingData } = useSWR<
        Array<number> | [],
        Error
    >(`/booking/getDonutData`, null, config);
    if (isLoadingBookingData || isLoadingCarData) return <CircularProgress />;
    return (
        <Card>
            <Grid spacing={0} container>
                <Grid
                    sx={{
                        position: "relative",
                    }}
                    display="flex"
                    alignItems="center"
                    item
                    xs={12}
                    md={6}
                >
                    <Box
                        component="span"
                        sx={{
                            display: { xs: "none", md: "inline-block" },
                        }}
                    >
                        <Divider absolute orientation="vertical" />
                    </Box>
                    <Box py={4} pr={4} flex={1}>
                        <Grid container spacing={0}>
                            <Grid
                                xs={12}
                                sm={6}
                                item
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Skeleton variant="rectangular" height={250} />
                                <Chart
                                    height={250}
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="donut"
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                item
                                display="flex"
                                alignItems="center"
                            >
                                <List
                                    disablePadding
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <ListItem disableGutters>
                                        <ListItemAvatarWrapper>
                                            <Circle
                                                sx={{
                                                    color: Red,
                                                }}
                                            />
                                        </ListItemAvatarWrapper>
                                        <ListItemText
                                            primary="Số vé đã huỷ"
                                            primaryTypographyProps={{
                                                variant: "h5",
                                                noWrap: true,
                                            }}
                                            // secondary="Bitcoin"
                                            // secondaryTypographyProps={{
                                            //     variant: "subtitle2",
                                            //     noWrap: true,
                                            // }}
                                        />
                                        <Box>
                                            <Typography
                                                align="right"
                                                variant="h4"
                                                noWrap
                                            >
                                                {chartSeries![2]}
                                            </Typography>
                                            {/* <Text color="error">
                                                {chartSeries![2]}
                                            </Text> */}
                                        </Box>
                                    </ListItem>
                                    <ListItem disableGutters>
                                        <ListItemAvatarWrapper>
                                            <Circle
                                                sx={{
                                                    color: Green,
                                                }}
                                            />
                                        </ListItemAvatarWrapper>
                                        <ListItemText
                                            primary="Số vé đã thanh toán"
                                            primaryTypographyProps={{
                                                variant: "h5",
                                                noWrap: true,
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                align="right"
                                                variant="h4"
                                                noWrap
                                            >
                                                {chartSeries![1]}
                                            </Typography>
                                            {/* <Text color="error">
                                                {chartSeries![1]}
                                            </Text> */}
                                        </Box>
                                    </ListItem>
                                    <ListItem disableGutters>
                                        <ListItemAvatarWrapper>
                                            <Circle
                                                sx={{
                                                    color: Blue,
                                                }}
                                            />
                                        </ListItemAvatarWrapper>
                                        <ListItemText
                                            primary="Số vé chưa thanh toán"
                                            primaryTypographyProps={{
                                                variant: "h5",
                                                noWrap: true,
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                align="right"
                                                variant="h4"
                                                noWrap
                                            >
                                                {chartSeries![0]}
                                            </Typography>
                                            {/* <Text color="error">
                                                {chartSeries![0]}
                                            </Text> */}
                                        </Box>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid
                    sx={{
                        position: "relative",
                    }}
                    display="flex"
                    alignItems="center"
                    item
                    xs={12}
                    md={6}
                >
                    <Box
                        component="span"
                        sx={{
                            display: { xs: "none", md: "inline-block" },
                        }}
                    >
                        <Divider absolute orientation="vertical" />
                    </Box>
                    <Box py={4} pr={4} flex={1}>
                        <Grid container spacing={0}>
                            <Grid
                                xs={12}
                                sm={6}
                                item
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Chart
                                    height={250}
                                    options={chartOptions2}
                                    series={chartSeries2}
                                    type="donut"
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                item
                                display="flex"
                                alignItems="center"
                            >
                                <List
                                    disablePadding
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <ListItem disableGutters>
                                        <ListItemAvatarWrapper>
                                            <Circle
                                                sx={{
                                                    color: Red,
                                                }}
                                            />
                                        </ListItemAvatarWrapper>
                                        <ListItemText
                                            primary="Xe đang bảo dưỡng"
                                            primaryTypographyProps={{
                                                variant: "h5",
                                                noWrap: true,
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                align="right"
                                                variant="h4"
                                                noWrap
                                            >
                                                {chartSeries2![2]}
                                            </Typography>
                                            {/* <Text color="error">
                                                {chartSeries2![2]}
                                            </Text> */}
                                        </Box>
                                    </ListItem>
                                    <ListItem disableGutters>
                                        <ListItemAvatarWrapper>
                                            <Circle
                                                sx={{
                                                    color: Green,
                                                }}
                                            />
                                        </ListItemAvatarWrapper>
                                        <ListItemText
                                            primary="Xe đang chờ"
                                            primaryTypographyProps={{
                                                variant: "h5",
                                                noWrap: true,
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                align="right"
                                                variant="h4"
                                                noWrap
                                            >
                                                {chartSeries2![1]}
                                            </Typography>
                                            {/* <Text color="error">
                                                {chartSeries2![1]}
                                            </Text> */}
                                        </Box>
                                    </ListItem>
                                    <ListItem disableGutters>
                                        <ListItemAvatarWrapper>
                                            <Circle
                                                sx={{
                                                    color: Blue,
                                                }}
                                            />
                                        </ListItemAvatarWrapper>
                                        <ListItemText
                                            primary="Xe đang chạy"
                                            primaryTypographyProps={{
                                                variant: "h5",
                                                noWrap: true,
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                align="right"
                                                variant="h4"
                                                noWrap
                                            >
                                                {chartSeries2![0]}
                                            </Typography>
                                            {/* <Text color="error">
                                                {chartSeries2![0]}
                                            </Text> */}
                                        </Box>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}

export default DonutOfDay;
