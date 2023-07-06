import {
    Card,
    Box,
    Typography,
    Avatar,
    Grid,
    alpha,
    useTheme,
    styled,
} from "@mui/material";
import Label from "@/components/Label";
// import Text from "@/components/Text";
import { Chart } from "@/components/Chart";
import type { ApexOptions } from "apexcharts";
// import { eachDayOfInterval, format } from "date-fns";
// import { useState } from "react";
const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
        theme.palette.mode === "dark"
            ? theme.colors.alpha.trueWhite[30]
            : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);
// const getMonthDays = (year: number, month: number) => {
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0);

//     const days = eachDayOfInterval({ start: startDate, end: endDate });

//     return days.map((day) => format(day, "d"));
// };
function generateRandomArray(length: number) {
    const array = [];
    for (let i = 0; i < length; i++) {
        const randomNum = Math.floor(Math.random() * 10000) + 10000; // Tạo số ngẫu nhiên từ 10,000 đến 20,000
        const roundedNum = Math.floor(randomNum / 1000) * 100000; // Làm tròn số để chia hết cho 1000
        array.push(roundedNum);
    }
    return array;
}

function getWeekDays(date: Date) {
    const weekDays = [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
    ];
    const dateStrings = [];

    for (let i = 1; i <= 7; i++) {
        const currentDate = new Date(
            date.getTime() + (i - 1) * 24 * 60 * 60 * 1000
        ); // Tính toán ngày tương ứng
        const dateString = currentDate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
        }); // Chuyển đổi sang dạng dd/mm
        dateStrings.push(dateString);
    }

    return dateStrings.map((day, i) => weekDays[i] + " (" + day + ")");
}
const randomData = generateRandomArray(7);
const listLabel = getWeekDays(new Date());
const chart2Data = [
    {
        name: "Doanh trong tuần ",
        data: randomData,
    },
];
// const yeah = 2023;

const total = randomData.reduce((total, val) => total + val, 0);
const totalLastMonth = 2000000;
const subTotal = total - totalLastMonth;
// const currentMonth = new Date().getMonth() + 1;
function ChartOfWeek() {
    const theme = useTheme();

    let chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
            zoom: {
                enabled: false,
            },
        },
        fill: {
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [0, 100],
            },
        },
        colors: [theme.colors.primary.main],
        dataLabels: {
            enabled: false,
        },
        theme: {
            mode: theme.palette.mode,
        },
        stroke: {
            show: true,
            colors: [theme.colors.primary.main],
            width: 3,
        },
        legend: {
            show: false,
        },
        labels: listLabel,
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            tickAmount: 5,
        },
        tooltip: {
            x: {
                show: true,
            },
            y: {
                title: {
                    // formatter: function () {
                    //     return "Doanh số: ";
                    // },true
                },
                formatter: function (val) {
                    return val.toLocaleString() + " VNĐ";
                },
            },
            marker: {
                show: true,
                fillColors: [theme.colors.error.light],
            },
        },
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
        >
            <Grid item md={12} xs={12}>
                <Card
                    sx={{
                        overflow: "visible",
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <AvatarWrapper>
                                <Box
                                    component="img"
                                    alt="sales"
                                    src="/icon/sales-icon.jpg"
                                />
                            </AvatarWrapper>
                            <Box>
                                <Typography variant="h4" noWrap>
                                    {`Doanh thu trong tuần`}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                pt: 3,
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    pr: 1,
                                    mb: 1,
                                }}
                            >
                                Tổng doanh số:
                            </Typography>
                            <Typography
                                variant="h3"
                                component="p"
                                sx={{
                                    pr: 1,
                                    mb: 1,
                                }}
                            >
                                {`${total.toLocaleString()} VNĐ`}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pl: 1,
                                }}
                            >
                                Tuần trước
                            </Typography>
                            <Label color={subTotal > 0 ? "success" : "error"}>
                                {`${
                                    subTotal > 0 ? "+" : ""
                                } ${subTotal.toLocaleString()} VNĐ`}{" "}
                            </Label>
                        </Box>
                    </Box>
                    <Chart
                        options={chartOptions}
                        series={chart2Data}
                        type="area"
                        height={200}
                    />
                </Card>
            </Grid>
        </Grid>
    );
}

export default ChartOfWeek;
