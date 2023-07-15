import { Link } from "@mui/material";

import { Box } from "@mui/system";

import { PureLightTheme } from "@/utils";

// const LogoTextWrapper = styled(Box)(
//     ({ theme }) => `
//         padding-left: ${theme.spacing(1)};
// `
// );

// const VersionBadge = styled(Box)(
//     ({ theme }) => `
//         background: ${theme.palette.success.main};
//         color: ${theme.palette.success.contrastText};
//         padding: ${theme.spacing(0.4, 1)};
//         border-radius: ${theme.general.borderRadiusSm};
//         text-align: center;
//         display: inline-block;
//         line-height: 1;
//         font-size: ${theme.typography.pxToRem(11)};
// `
// );

// const LogoText = styled(Box)(
//     ({ theme }) => `
//         font-size: ${theme.typography.pxToRem(15)};
//         font-weight: ${theme.typography.fontWeightBold};
// `
// );

function Logo() {
    return (
        <>
            <Link href="/">
                <Box
                    component="img"
                    src="/logo2.png"
                    sx={{
                        width: "auto",
                        height: "50px",
                        color: `${PureLightTheme.palette.text.primary}`,
                        padding: `${PureLightTheme.spacing(0, 1, 0, 0)}`,
                        display: "flex",
                        textDecoration: "none",
                        fontWeight: `${PureLightTheme.typography.fontWeightBold}`,
                    }}
                ></Box>
            </Link>
        </>
    );
}

export default Logo;
