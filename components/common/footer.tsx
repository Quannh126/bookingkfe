import * as React from "react";
import { Box, Container, Grid, Icon, Stack, Typography } from "@mui/material";
import { Facebook } from "@mui/icons-material";
import clsx from "clsx";
import styled from "@mui/styled-engine";
export interface IFooterProps {
    isSideBar: boolean;
}
const PreviewIframe = styled("iframe")(() => ({
    border: "none",
}));

export function Footer({ isSideBar }: IFooterProps) {
    const link = [
        { icon: Facebook, url: "https://www.facebook.com/BaoYenTuyenQuang/" },
    ];
    return (
        <Box
            component="footer"
            className={clsx({
                havesidebar: isSideBar,
            })}
            py={2}
            textAlign="center"
        >
            <Container>
                <Grid container spacing={4}>
                    <Grid xs={12} md={6} item>
                        <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
                            CÔNG TY CỔ PHẦN TẬP ĐOÀN B.Y
                        </Typography>
                        <Box>
                            <Typography component="p">
                                <Typography
                                    component="b"
                                    sx={{ fontWeight: "bolder" }}
                                >
                                    Văn phòng Tuyên Quang:
                                </Typography>
                                <Typography component="span">
                                    {" "}
                                    Số 95, Đường Chiến Thắng Sông Lô, Phường Tân
                                    Quang, Thành Phố Tuyên Quang, Tỉnh Tuyên
                                    Quang
                                </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                component="b"
                                sx={{ fontWeight: "bolder" }}
                            >
                                Email:
                            </Typography>
                            <Typography component="span">
                                {" "}
                                baoyentuyenquangfake@gmail.com
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                component="b"
                                sx={{ fontWeight: "bolder" }}
                            >
                                Tổng đài:
                            </Typography>
                            <Typography component="span">
                                {" "}
                                0974095***
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid xs={12} md={3} item>
                        <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
                            Các hình thức thanh toán
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={3} item>
                        <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
                            Bản đồ
                        </Typography>
                        <PreviewIframe src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1852.1063700294299!2d105.21331017082659!3d21.810709725730554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1593746074679!5m2!1svi!2s" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"'></PreviewIframe>
                    </Grid>
                </Grid>
            </Container>
            <Box></Box>

            <Stack direction="row" justifyContent="center">
                {link.map((item, idx) => (
                    <Box
                        key={idx}
                        component="a"
                        p={2}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon
                            component={item.icon}
                            sx={{ fronSize: 48, color: "blue" }}
                        />
                    </Box>
                ))}
            </Stack>
            <Typography>
                Bản quyền thuộc © 2023 thuộc về CÔNG TY CỔ PHẦN TẬP ĐOÀN B.Y Dev
                by QuanNH{" "}
            </Typography>
        </Box>
    );
}
