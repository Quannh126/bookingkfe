import { NextPageContext } from "next";
import { ErrorProps } from "next/error";
import { Box } from "@mui/system";
import {
    Button,
    ButtonProps,
    // Card,
    Container,
    Divider,
    // FormControl,
    // InputAdornment,
    // OutlinedInput,
    Typography,
    styled,
} from "@mui/material";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Head from "next/head";
import { useRouter } from "next/router";
import { PureLightTheme } from "@/utils";
// import Logo from "@/components/Logo";
interface CustomErrorProps extends ErrorProps {
    statusCode: number;
}
const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      background-color: #4586b0;
  `
);

const TopWrapper = styled(Box)(
    ({ theme }) => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(2)};
  `
);

// const OutlinedInputWrapper = styled(OutlinedInput)(
//     ({ theme }) => `
//       background-color: ${theme.colors.alpha.white[100]};
//   `
// );

// const ButtonSearch = styled(Button)(
//     ({ theme }) => `
//       margin-right: -${theme.spacing(1)};
//   `
// );
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(theme.colors.info.light),
    backgroundColor: theme.colors.alpha.trueWhite[70],
    "&:hover": {
        backgroundColor: theme.colors.info.dark,
    },
}));
const ErrorPage = ({ statusCode }: CustomErrorProps) => {
    const router = useRouter();
    if (statusCode === 404) {
        return (
            <>
                <Head>
                    <title>Status - {statusCode}</title>
                </Head>
                <MainContent>
                    <TopWrapper>
                        <Container maxWidth="md">
                            <Box
                                display="flex"
                                sx={{
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifySelf: "center",
                                    alignItems: "center",
                                    padding: PureLightTheme.spacing(3),
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: PureLightTheme.colors.alpha
                                            .trueWhite[70],
                                    }}
                                >
                                    {statusCode}
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: PureLightTheme.colors.alpha
                                            .trueWhite[70],
                                    }}
                                >
                                    Không tìm thấy trang này !
                                </Typography>
                            </Box>
                            <Box textAlign="center">
                                <Box
                                    component="img"
                                    alt="404"
                                    height={"50%"}
                                    src="/img/ErrorImg.jpg"
                                />
                            </Box>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    mt: 3,
                                    p: 4,
                                    backgroundColor: "#4586b0",
                                }}
                            >
                                <ColorButton
                                    onClick={() => router.push("/")}
                                    variant="text"
                                >
                                    Trở lại trang chủ
                                </ColorButton>
                            </Box>
                        </Container>
                    </TopWrapper>
                </MainContent>
            </>
        );
    } else if (statusCode === 403) {
        return (
            <>
                <Head>
                    <title>Status - {statusCode}</title>
                </Head>
                <MainContent>
                    <TopWrapper>
                        <Container maxWidth="md">
                            <Box
                                display="flex"
                                sx={{
                                    flexDirection: "column",
                                    alignContent: "center",
                                    justifySelf: "center",
                                    alignItems: "center",
                                    padding: PureLightTheme.spacing(3),
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: PureLightTheme.colors.alpha
                                            .trueWhite[70],
                                    }}
                                >
                                    {statusCode}
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: PureLightTheme.colors.alpha
                                            .trueWhite[70],
                                    }}
                                >
                                    Bạn không đủ quyền truy cập trang này
                                </Typography>
                            </Box>
                            <Box textAlign="center">
                                <Box
                                    component="img"
                                    alt="404"
                                    height={"50%"}
                                    src="/img/ErrorImg.jpg"
                                />
                            </Box>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    mt: 3,
                                    p: 4,
                                    backgroundColor: "#4586b0",
                                }}
                            >
                                <ColorButton
                                    onClick={() => router.push("/")}
                                    variant="text"
                                >
                                    Trở lại đăng nhập
                                </ColorButton>
                                <Divider sx={{ my: 4 }}>Hoặc</Divider>
                                <ColorButton
                                    onClick={() => router.push("/admin")}
                                    variant="text"
                                >
                                    Trở lại trang quản lý
                                </ColorButton>
                            </Box>
                        </Container>
                    </TopWrapper>
                </MainContent>
            </>
        );
    }
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

    return { statusCode };
};

export default ErrorPage;
