// import AdminLayout from "@/components/layout/admin";
// import { Box } from "@mui/system";
import Head from "next/head";
// import { useRouter } from 'next/router'
import { NextpageWithLayout } from "../../models";
import SidebarLayout from "@/components/layout/SidebarLayout";
import WatchList from "@/components/contexts/Dashboards/Charts/ChartComponents";
import { Container, Grid, Typography } from "@mui/material";
import AccountBalance from "@/components/contexts/Dashboards/Charts/DonutOfDay";

import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/components/contexts/Dashboards/Charts/PageHeader";

const Dashboard: NextpageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Báo cáo - Thống kê</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            Thống kê trong ngày
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <AccountBalance />
                    </Grid>
                    {/* <Grid item lg={8} xs={12}>
                        <Wallets />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <AccountSecurity />
                    </Grid> */}
                    <Grid item xs={12}>
                        <WatchList />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

Dashboard.Layout = SidebarLayout;

export default Dashboard;
