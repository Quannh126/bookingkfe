import * as React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
} from "@mui/material";
import { IPopularCard } from "@/models";
import clsx from "clsx";
export interface IPopularCardProps {
    card: IPopularCard;
}

export default function PopularCard({ card }: IPopularCardProps) {
    if (!card) return null;
    return (
        <Card sx={{ position: "relative", width: "250px" }}>
            <CardActionArea sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image="/img/cardImg.jpg"
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: "100%",
                        width: "100%",
                    }}
                />
                <CardContent
                    sx={{
                        height: "200px",
                        position: "relative",
                        // backgroundColor: "transparent",
                        color: "#ffffff",
                        backgroundColor: "rgba(0,0,0,.24)",
                        display: "",
                    }}
                >
                    <Typography component="h5" fontWeight="bold">
                        {card.title}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold">
                        {card.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: "12px 10px !important",
                }}
            >
                <Typography variant="body2" mr={1}>
                    {card.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                    })}
                </Typography>
                {card.priceDiscount && (
                    <Typography
                        className={clsx({
                            lineThrough: card.priceDiscount,
                        })}
                        variant="body2"
                    >
                        {card.priceDiscount.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
