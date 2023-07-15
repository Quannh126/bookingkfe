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
import { Card, CardContent, Typography } from "@mui/material";
import { getReturnUrlStatus } from "@/utils";
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

const Return_Vnp: NextpageWithLayout = () => {
    const router = useRouter();

    const [dataCheckSum, setDataCheckSum] = useState({ ...router.query });
    const [checkSumResult, setCheckSumResult] = useState({
        code: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { query } = router;
        const queryParams = queryString.stringify(query);
        //console.log(queryParams);
        setDataCheckSum({ ...router.query });

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
    // {Object.entries(dataCheckSum).map(([key, value], i) => {
    //     return (
    //         <Typography key={i} component="p">
    //             <Typography component="b">{`${key}: `}</Typography>
    //             {value}
    //         </Typography>
    //     );
    // }

    if (isLoading) {
        return <LoadingPage />;
    } else {
        return (
            <>
                <Card>
                    <Typography variant="h3" color="GrayText">
                        {checkSumResult.code}
                    </Typography>
                    <Typography variant="h3" color="GrayText">
                        {checkSumResult.code}
                        {getReturnUrlStatus(checkSumResult.code, "vn")}
                    </Typography>
                    <CardContent>
                        {Object.entries(dataCheckSum).map(([key, value], i) => {
                            return (
                                <Typography key={i} component="p">
                                    <Typography component="b">{`${key}: `}</Typography>
                                    {value}
                                </Typography>
                            );
                        })}
                    </CardContent>
                </Card>
            </>
        );
    }
};

Return_Vnp.Layout = BaseLayout;
export default Return_Vnp;
