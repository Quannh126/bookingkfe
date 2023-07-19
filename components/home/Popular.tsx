import * as React from "react";
import { Box } from "@mui/system";
import { Container, Stack, Typography } from "@mui/material";
import PopularCard from "./PopularCard";
import { IPopularCard } from "@/models/index";
export interface IPopularsProps {}

export function Popular() {
    const listCard: IPopularCard[] = [
        {
            id: 1,
            title: "Hà Nội - Hải Phòng",
            price: 180000,
            description: "9h - 3h",
        },
        {
            id: 2,
            title: "Hà Nội - Tuyên Quang",
            price: 280000,

            description: "4h - 5h",
        },
        {
            id: 3,
            title: "Hà Nội - Phú Thọ",
            price: 280000,
            priceDiscount: 180000,
            description: "4h - 6h",
        },
        {
            id: 4,
            title: "Hà Nội - Điện Biên",
            price: 280000,
            priceDiscount: 180000,
            description: "6h - 9h",
        },
    ];
    return (
        <Box component="section" bgcolor="light" pt={2} pb={4}>
            <Container>
                <Stack pb={2}>
                    <Typography variant="h4" fontWeight="bold">
                        Địa điểm nổi bật
                    </Typography>
                </Stack>

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={2}
                    sx={{
                        overflowX: "auto",
                    }}
                >
                    {listCard.map((card: IPopularCard) => (
                        <Box key={card.id}>
                            <PopularCard card={card} />
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}
