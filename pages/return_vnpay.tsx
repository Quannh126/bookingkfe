// import MainLayout from "@/components/layout/main";
// import { Box } from "@mui/system";
import { NextpageWithLayout } from "@/models";
// import LoadingPage from "@/components/common/loading";

import LoadingPage from "@/components/common/loading";
// import { useEffect } from "react";
import { useRouter } from "next/router";
import { coachApi } from "@/api-client";
import { useEffect, useState } from "react";
export interface IAbountPageProps {}

import queryString from "query-string";
import BaseLayout from "@/components/layout/BaseLayout";
import {
    Button,
    Card,
    CardContent,
    Container,
    // IconButton,
    Typography,
    styled,
} from "@mui/material";
import { PureLightTheme, getReturnUrlStatus } from "@/utils";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import { Box } from "@mui/system";
import Head from "next/head";
import Logo from "@/components/Logo";
import moment from "moment";
export type DataCheckSum = {
    vnp_Amount: string;
    vnp_BankCode: string;
    vnp_BankTranNo: string;
    vnp_CardType: string;
    vnp_OrderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: string;
    vnp_TransactionStatus: string;
    vnp_TxnRef: string;
    vnp_SecureHash: string;
};
const HeaderWrapper = styled(Card)(
    ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(2)};
  `
);
const TextDetail = styled(Typography)(
    ({ theme }) => `
    font-size: 18px
    color: ${theme.colors.primary.light};
    
    
`
);
const RowTextDetail = styled(Box)(
    ({ theme }) => `
    display: flex;
    justify-content: space-between;
    padding-bottom: ${theme.spacing(3)};
`
);
const Return_Vnp: NextpageWithLayout = () => {
    const router = useRouter();

    // const [dataCheckSum, setDataCheckSum] = useState({ ...router.query });
    const [checkSumResult, setCheckSumResult] = useState({
        code: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { query } = router;
        // console.log("Qurry", query);
        const queryParams = queryString.stringify(query);

        // setDataCheckSum({ ...router.query });

        const checkSum = async () => {
            setIsLoading(true);

            const data = await coachApi.checkSum(queryParams);
            setCheckSumResult(data);
            return data;
        };

        if (queryParams) {
            checkSum();
        }
        setIsLoading(false);
    }, [router]);
    if (isLoading || !router.isReady) {
        return (
            <>
                <LoadingPage />
            </>
        );
    }
    return (
        <Box
            sx={{
                overflow: "auto",
                flex: 1,
                overflowX: "hidden",
            }}
        >
            <Head>
                <title>{`Kết quả thanh toán`}</title>
            </Head>
            <HeaderWrapper>
                <Container maxWidth="lg">
                    <Box display="flex">
                        <Logo />
                    </Box>
                </Container>
            </HeaderWrapper>
            <Container maxWidth="sm">
                <Card
                    sx={{
                        padding: PureLightTheme.spacing(3),
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {checkSumResult.code === "00" ||
                            checkSumResult.code === "02" ? (
                                <CheckCircleTwoToneIcon
                                    fontSize="large"
                                    sx={{
                                        color: PureLightTheme.colors.success
                                            .light,
                                        fontSize: "80px",
                                    }}
                                />
                            ) : (
                                <HighlightOffTwoToneIcon
                                    fontSize="large"
                                    sx={{
                                        color: PureLightTheme.colors.error
                                            .light,
                                        fontSize: "80px",
                                    }}
                                />
                            )}
                            <Typography
                                variant="h3"
                                color="GrayText"
                                sx={{
                                    paddingBottom: PureLightTheme.spacing(2),
                                    textAlign: "center",
                                }}
                            >
                                {getReturnUrlStatus(checkSumResult.code, "vn")}
                            </Typography>
                        </Box>
                        {/* <Typography variant="h3" color="GrayText">
                                {checkSumResult.code}
                            </Typography> */}
                        <RowTextDetail display="flex">
                            <TextDetail variant="h4" color="GrayText">
                                Loại thẻ
                            </TextDetail>
                            <TextDetail variant="h4" color="GrayText">
                                {`${router.query?.vnp_CardType}`}
                            </TextDetail>
                        </RowTextDetail>
                        <RowTextDetail display="flex">
                            <TextDetail variant="h4" color="GrayText">
                                Ngân hàng
                            </TextDetail>
                            <TextDetail variant="h4" color="GrayText">
                                {`${router.query?.vnp_BankCode}`}
                            </TextDetail>
                        </RowTextDetail>
                        <RowTextDetail display="flex">
                            <TextDetail variant="h4" color="GrayText">
                                Số tiền
                            </TextDetail>
                            <TextDetail variant="h4" color="GrayText">
                                {`${(
                                    parseFloat(
                                        router.query?.vnp_Amount!.toString()
                                    ) / 100
                                )?.toLocaleString()} VNĐ`}
                            </TextDetail>
                        </RowTextDetail>
                        <RowTextDetail display="flex">
                            <TextDetail variant="h4" color="GrayText">
                                Mã giao dịch tại Ngân hàng
                            </TextDetail>
                            <TextDetail variant="h4" color="GrayText">
                                {`${router.query?.vnp_BankTranNo}`}
                            </TextDetail>
                        </RowTextDetail>
                        <RowTextDetail display="flex">
                            <TextDetail variant="h4" color="GrayText">
                                Mã giao dịch VNPay
                            </TextDetail>
                            <TextDetail variant="h4" color="GrayText">
                                {`${router.query?.vnp_TransactionNo}`}
                            </TextDetail>
                        </RowTextDetail>
                        <RowTextDetail display="flex">
                            <TextDetail variant="h4" color="GrayText">
                                Thời gian thanh toán
                            </TextDetail>
                            <TextDetail variant="h4" color="GrayText">
                                {`${moment(
                                    router.query?.vnp_PayDate,
                                    "YYYYMMDDHHmmss"
                                ).format("DD/MM/YYYY, h:mm:ss")}`}
                            </TextDetail>
                        </RowTextDetail>
                        <RowTextDetail>
                            {/* <TextDetail variant="h4" color="GrayText" >
                                    
                                </TextDetail> */}
                            <TextDetail variant="h4" color="GrayText">
                                {`Mô tả: ${router.query?.vnp_OrderInfo}`}
                            </TextDetail>
                        </RowTextDetail>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginTop: PureLightTheme.spacing(3),
                            }}
                        >
                            {(checkSumResult.code === "02" ||
                                checkSumResult.code === "00") && (
                                <Button
                                    variant="contained"
                                    endIcon={<PrintTwoToneIcon />}
                                >
                                    In vé
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={() => router.push("/")}
                            >
                                Trở lại trang chủ
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

Return_Vnp.Layout = BaseLayout;
export default Return_Vnp;
