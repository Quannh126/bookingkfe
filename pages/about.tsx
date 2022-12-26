import MainLayout from "@/components/layout/main";
import { Box } from "@mui/system";
import { NextpageWithLayout } from "@/models";
export interface IAbountPageProps {}

const AboutPage: NextpageWithLayout = () => {
    return <Box>About</Box>;
};

AboutPage.Layout = MainLayout;
export default AboutPage;
