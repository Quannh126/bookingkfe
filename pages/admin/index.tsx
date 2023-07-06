// import AdminLayout from "@/components/layout/admin";
// import { Box } from "@mui/system";
import Head from "next/head";
// import { useRouter } from 'next/router'
import { NextpageWithLayout } from "../../models";
import SidebarLayout from "@/components/layout/SidebarLayout";
import ChartComponent from "@/components/contexts/Dashboards/Charts/ChartComponents";

import { Container, Grid } from "@mui/material";
import AccountBalance from "@/components/contexts/Dashboards/Charts/DonutOfDay";

import Footer from "@/components/Footer";

const Admin: NextpageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Báo cáo - Thống kê</title>
            </Head>

            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item xs={12}>
                        <AccountBalance />
                    </Grid>

                    <Grid item xs={12}>
                        <ChartComponent />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

Admin.Layout = SidebarLayout;

export default Admin;
