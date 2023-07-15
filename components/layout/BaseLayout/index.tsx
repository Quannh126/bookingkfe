import { LayoutProps } from "@/models";
import { Box } from "@mui/system";
// import { Container, Button, styled, Card } from "@mui/material";
// import Logo from "@/components/Logo";
// const HeaderWrapper = styled(Card)(
//     ({ theme }) => `
//     width: 100%;
//     display: flex;
//     align-items: center;
//     height: ${theme.spacing(10)};
//     margin-bottom: ${theme.spacing(6)};
//   `
// );
// const OverviewWrapper = styled(Box)(
//     ({ theme }) => `
//       overflow: auto;
//       background: ${theme.palette.common.white};
//       flex: 1;
//       overflow-x: hidden;
//   `
// );
export default function BaseLayout({ children }: LayoutProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                height: "100%",
            }}
        >
            {children}
        </Box>
        // <Box
        //     sx={{
        //         display: "flex",
        //         flex: 1,
        //         height: "100%",
        //     }}
        // >
        //     <OverviewWrapper>
        //         <HeaderWrapper>
        //             <Container maxWidth="lg">
        //                 <Box display="flex" alignItems="center">
        //                     <Logo />
        //                     <Box
        //                         display="flex"
        //                         alignItems="center"
        //                         justifyContent="space-between"
        //                         flex={1}
        //                     >
        //                         <Box />
        //                         <Box>
        //                             <Button>Đăng nhập</Button>
        //                         </Box>
        //                     </Box>
        //                 </Box>
        //             </Container>
        //         </HeaderWrapper>

        //         <Container maxWidth="lg">{children}</Container>
        //     </OverviewWrapper>
        // </Box>
    );
}
