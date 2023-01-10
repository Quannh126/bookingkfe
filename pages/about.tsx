// import MainLayout from "@/components/layout/main";
import { Box } from "@mui/system";
import { NextpageWithLayout } from "@/models";
import LoadingPage from "@/components/common/loading";
import EmptyLayout from "@/components/layout/empty";
export interface IAbountPageProps {}

const AboutPage: NextpageWithLayout = () => {
    return (
        <Box>
            <LoadingPage />
        </Box>
    );
};

AboutPage.Layout = EmptyLayout;
export default AboutPage;
