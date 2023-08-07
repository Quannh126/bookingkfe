import {
    Card,
    Box,
    Typography,
    Avatar,
    Grid,
    alpha,
    useTheme,
    styled,
    CardContent,
    CircularProgress,
} from "@mui/material";
import Label from "@/components/Label";

import { Chart } from "@/components/Chart";
import type { ApexOptions } from "apexcharts";
import useSWR, { SWRConfiguration } from "swr";
// import { useState } from "react";
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

function generateRandomArray(length: number) {
    const array = [];
    for (let i = 0; i < length; i++) {
        const randomNum = Math.floor(Math.random() * 10000) + 10000; // Tạo số ngẫu nhiên từ 10,000 đến 20,000
        const roundedNum = Math.floor(randomNum / 1000) * 1000000; // Làm tròn số để chia hết cho 1000
        array.push(roundedNum);
    }
    return array;
}

// const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth() + 1;

// const monthDays = getMonthDays(currentYear, currentMonth);

const randomData = generateRandomArray(12);
const randomData2 = generateRandomArray(12);
const total = randomData.reduce((total, val) => total + val, 0);
const totalLastMonth = randomData2.reduce((total, val) => total + val, 0);
const subTotal = total - totalLastMonth;
const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth() + 1;
// let listDays = getMonthDays(currentYear, currentMonth).map((day) => "Ngày " + day);

const chart2Data = [
    {
        name: "Doanh số năm " + currentYear,
        data: randomData,
    },
];

function ChartOfYear() {
    const theme = useTheme();
    // const [year, setYear] = useState(currentYear);
    // const handleChangeYear = (val:number) =>{
    //     setYear(val);
    // }
    let chartOptions: ApexOptions = {
        chart: {
            background: "transparent",
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: false,
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
        labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        xaxis: {
            labels: {
                show: true,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            // type: "category",
            // categories: [
            //     "Tháng 1",
            //     "Tháng 2",
            //     "Tháng 3",
            //     "Tháng 4",
            //     "Tháng 5",
            //     "Tháng 6",
            //     "Tháng 7",
            //     "Tháng 8",
            //     "Tháng 9",
            //     "Tháng 10",
            //     "Tháng 11",
            //     "Tháng 12",
            // ],
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
                    formatter: function () {
                        return "Doanh số: ";
                    },
                },
            },
            marker: {
                show: true,
            },
        },
    };
    const config: SWRConfiguration = {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnMount: true,
        revalidateOnFocus: false,
    };

    const { data, isLoading: isLoadingBookingData } = useSWR<
        Array<number> | [],
        Error
    >(`/booking/getYearData`, null, config);
    if (isLoadingBookingData) return <CircularProgress />;
    const chart2Data = [
        {
            name: "Doanh số năm " + currentYear,
            data: data!,
        },
    ];
    const total = (data as number[]).reduce((total, val) => total + val, 0);
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
                    <CardContent>
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
                                        {`Doanh số theo năm ${currentYear}`}
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
                            {/* <Box
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
                                    Năm trước
                                </Typography>
                                <Label
                                    color={subTotal > 0 ? "success" : "error"}
                                >
                                    {`${
                                        subTotal > 0 ? "+" : ""
                                    } ${subTotal.toLocaleString()} VNĐ`}{" "}
                                </Label>
                            </Box> */}
                        </Box>
                        <Chart
                            options={chartOptions}
                            series={chart2Data}
                            type="area"
                            height={200}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default ChartOfYear;
