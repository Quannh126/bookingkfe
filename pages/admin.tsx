import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
// import { useRouter } from 'next/router'
import { NextpageWithLayout } from "../models";

const Admin: NextpageWithLayout = () => {
    return <Box>Homepage</Box>;
};

Admin.Layout = AdminLayout;

export default Admin;
