import React, { useCallback, useEffect } from "react";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectTripState } from "@/redux/selectedTrip";
import { setFormStep1, nextStep, getFormState } from "@/redux/stepForm";
import clsx from "clsx";

export default function FirstStep() {
    const dispatch = useDispatch();

    const formValues = useSelector(getFormState);
    const { selected_seats, fare } = formValues;
    const selectedTrip = useSelector(selectTripState).seletedTrip;

    const isError = useCallback(
        () =>
            Object.keys({ selected_seats, fare }).some((name) => {
                // console.log("isError", name, formValues[name]);
                return (
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
                );
            }),
        [formValues, selected_seats, fare]
    );

    function handleClickToSeat(seatNumber: number, fare: string) {
        if (formValues.selected_seats.value.includes(seatNumber)) {
            const listSelected = formValues.selected_seats.value.filter(
                (seat: number) => seat !== seatNumber
            );
            // setSelectedSeats(listSelected);
            // handleSeleteSeat(listSelected, listSelected!.length * Number(fare));
            dispatch(
                setFormStep1({
                    selected_seats: listSelected,
                    fare: listSelected!.length * Number(fare),
                })
            );
        } else {
            const newList = [...formValues.selected_seats.value, seatNumber];
            // setSelectedSeats(newList);
            // handleSeleteSeat(newList, newList!.length * Number(fare));
            dispatch(
                setFormStep1({
                    selected_seats: newList,
                    fare: newList!.length * Number(fare),
                })
            );
        }
    }

    let row = 10;
    let col = 5;
    switch (Number(selectedTrip.car.capacity)) {
        case 9:
            row = 4;
            col = 3;
            break;
        case 21:
            row = 5;
            col = 5;
            break;
        case 29:
            row = 7;
            col = 5;
            break;
        case 45:
            row = 10;
            col = 5;
            break;
        default:
            row = 4;
            col = 5;
            break;
    }
    let seats: number[][] = [];
    let countSeat = 1;
    for (let i = 0; i < row; i++) {
        let rowLine: number[] = [];

        for (let j = 0; j < col; j++) {
            if (j === Math.floor(col / 2)) {
                if (i != row - 1) {
                    rowLine.push(-1);
                } else {
                    rowLine.push(countSeat);
                    countSeat++;
                }
                // Giữa hàng có chỗ trống
            } else {
                rowLine.push(countSeat);
                countSeat++;
                // Số ghế tăng dần từ 1 đến 45
            }
        }

        seats.push(rowLine);
    }
    // console.log(formValues);
    const mapNote = [
        { selected: true, booked: false, title: "Ghế đã chọn" },
        { selected: false, booked: true, title: "Ghế đã được đặt" },
        { selected: false, booked: false, title: "Ghế trống" },
    ];

    useEffect(() => {
        const step1height =
            document.getElementById("bookingtab1")!.clientHeight;
        localStorage.setItem("step1height", step1height.toString() ?? "");
    }, []);
    return (
        <Box id={"bookingtab1"} sx={{ padding: "30px" }}>
            <Box sx={{ display: "flex" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "auto",
                    }}
                >
                    <Box>
                        {mapNote.map((info, index) => {
                            return (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: "10px",
                                    }}
                                    key={index}
                                >
                                    <Box
                                        className={clsx({
                                            selected: info.selected,
                                            booked: info.booked,
                                            "seat-container": true,
                                            // seatcss: !isBooked,
                                        })}
                                        color="#b8b8b8"
                                    >
                                        <Tooltip
                                            title={info.title}
                                            arrow
                                            placement="bottom-end"
                                        >
                                            <svg
                                                width="40"
                                                height="32"
                                                viewBox="0 0 40 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="8.75"
                                                    y="2.75"
                                                    width="22.5"
                                                    height="26.5"
                                                    rx="2.25"
                                                    fill="#FFF"
                                                    stroke="#B8B8B8"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                ></rect>
                                                <rect
                                                    x="10.25"
                                                    y="11.75"
                                                    width="14.5"
                                                    height="5.5"
                                                    rx="2.25"
                                                    transform="rotate(90 10.25 11.75)"
                                                    fill="#FFF"
                                                    stroke="#B8B8B8"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                ></rect>
                                                <rect
                                                    x="35.25"
                                                    y="11.75"
                                                    width="14.5"
                                                    height="5.5"
                                                    rx="2.25"
                                                    transform="rotate(90 35.25 11.75)"
                                                    fill="#FFF"
                                                    stroke="#B8B8B8"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                ></rect>
                                                <rect
                                                    x="8.75"
                                                    y="22.75"
                                                    width="22.5"
                                                    height="6.5"
                                                    rx="2.25"
                                                    fill="#FFF"
                                                    stroke="#B8B8B8"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                ></rect>
                                                <path
                                                    className="icon-selected"
                                                    d="M20 6.333A6.67 6.67 0 0 0 13.334 13 6.67 6.67 0 0 0 20 19.667 6.67 6.67 0 0 0 26.667 13 6.669 6.669 0 0 0 20 6.333zm-1.333 10L15.333 13l.94-.94 2.394 2.387 5.06-5.06.94.946-6 6z"
                                                    fill="transparent"
                                                ></path>
                                                <path
                                                    className="icon-disabled"
                                                    d="M24.96 9.46l-1.42-1.42L20 11.59l-3.54-3.55-1.42 1.42L18.59 13l-3.55 3.54 1.42 1.42L20 14.41l3.54 3.55 1.42-1.42L21.41 13l3.55-3.54z"
                                                    fill="transparent"
                                                ></path>
                                            </svg>
                                        </Tooltip>
                                    </Box>
                                    <Typography>{info.title}</Typography>
                                </Box>
                            );
                        })}
                    </Box>

                    {formValues.selected_seats.value.length > 0 && (
                        <Typography component="p" sx={{ marginTop: "auto" }}>
                            <Typography component="span">{`Ghế số: `}</Typography>
                            <Typography
                                component="span"
                                fontWeight="bold"
                            >{`${formValues.selected_seats.value.join(
                                `, `
                            )}`}</Typography>
                        </Typography>
                    )}
                </Box>
                <Box>
                    <Box className="seat-template">
                        <Box className="coach-container">
                            <Box className="coach">
                                <Table>
                                    <TableBody>
                                        <TableRow className="coach-row">
                                            <TableCell className="seat">
                                                <Box className=" seat-container">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.305 24h-.61c-.035-.004-.07-.01-.105-.012a11.783 11.783 0 0 1-2.117-.261 12.027 12.027 0 0 1-6.958-4.394A11.933 11.933 0 0 1 .027 12.78L0 12.411v-.822c.005-.042.013-.084.014-.127a11.845 11.845 0 0 1 1.102-4.508 12.007 12.007 0 0 1 2.847-3.852A11.935 11.935 0 0 1 11.728.003c.947-.022 1.883.07 2.81.27 1.22.265 2.369.71 3.447 1.335a11.991 11.991 0 0 1 3.579 3.164 11.876 11.876 0 0 1 2.073 4.317c.178.712.292 1.434.334 2.168.008.146.02.292.029.439v.609c-.004.03-.011.06-.012.089a11.81 11.81 0 0 1-1.05 4.521 12.02 12.02 0 0 1-1.92 2.979 12.046 12.046 0 0 1-6.395 3.812c-.616.139-1.24.23-1.872.265-.149.008-.297.02-.446.03zm8.799-13.416c-.527-3.976-4.078-7.808-9.1-7.811-5.02-.003-8.583 3.823-9.11 7.809h.09c.64-.035 1.278-.092 1.912-.195.815-.131 1.614-.326 2.378-.639.625-.255 1.239-.54 1.855-.816.82-.368 1.673-.593 2.575-.62a7.123 7.123 0 0 1 1.947.187c.585.146 1.136.382 1.68.634.57.264 1.14.526 1.733.736 1.2.424 2.442.62 3.706.7.11.006.222.01.334.015zm-10.95 10.471v-.094c0-1.437 0-2.873-.002-4.31 0-.141-.011-.284-.035-.423a2.787 2.787 0 0 0-.775-1.495c-.564-.582-1.244-.896-2.067-.892-1.414.007-2.827.002-4.24.002h-.09a9.153 9.153 0 0 0 3.125 5.256 9.15 9.15 0 0 0 4.083 1.956zm3.689.001c1.738-.36 3.25-1.137 4.528-2.355 1.4-1.334 2.287-2.956 2.685-4.855l-.077-.003h-4.362c-.237 0-.47.038-.695.112-.667.22-1.188.635-1.588 1.206a2.673 2.673 0 0 0-.494 1.59c.008 1.4.003 2.801.003 4.202v.103zM12.05 14.22c1.215-.035 2.204-1.083 2.165-2.275-.039-1.223-1.095-2.215-2.29-2.166-1.211.05-2.2 1.108-2.15 2.302.051 1.191 1.108 2.186 2.275 2.139z"
                                                            fill="#858585"
                                                        ></path>
                                                    </svg>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        {seats.map((row, index1) => {
                                            // const isBooked
                                            return (
                                                <TableRow
                                                    className="coach-row"
                                                    key={index1}
                                                >
                                                    {row.map((seat, index2) => {
                                                        let isBooked =
                                                            selectedTrip.seat_detail.some(
                                                                (
                                                                    seatDetail: any
                                                                ) =>
                                                                    seatDetail.seat ===
                                                                    `${seat}`
                                                            );
                                                        let isSelected =
                                                            formValues.selected_seats.value.includes(
                                                                seat
                                                            );
                                                        return (
                                                            <TableCell
                                                                className="seat"
                                                                key={
                                                                    index1 +
                                                                    "" +
                                                                    index2
                                                                }
                                                            >
                                                                <Box
                                                                    className={clsx(
                                                                        {
                                                                            selected:
                                                                                isSelected,
                                                                            booked: isBooked,
                                                                            "seat-container":
                                                                                true,
                                                                            seatcss:
                                                                                !isBooked,
                                                                        }
                                                                    )}
                                                                    color="#b8b8b8"
                                                                >
                                                                    {seat !=
                                                                        -1 && (
                                                                        <Tooltip
                                                                            title={`Ghế số ${seat}`}
                                                                            arrow
                                                                            placement="bottom-end"
                                                                        >
                                                                            <svg
                                                                                width="40"
                                                                                height="32"
                                                                                viewBox="0 0 40 32"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        !isBooked
                                                                                    ) {
                                                                                        handleClickToSeat(
                                                                                            seat,
                                                                                            selectedTrip.fare
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <rect
                                                                                    x="8.75"
                                                                                    y="2.75"
                                                                                    width="22.5"
                                                                                    height="26.5"
                                                                                    rx="2.25"
                                                                                    fill="#FFF"
                                                                                    stroke="#B8B8B8"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinejoin="round"
                                                                                ></rect>
                                                                                <rect
                                                                                    x="10.25"
                                                                                    y="11.75"
                                                                                    width="14.5"
                                                                                    height="5.5"
                                                                                    rx="2.25"
                                                                                    transform="rotate(90 10.25 11.75)"
                                                                                    fill="#FFF"
                                                                                    stroke="#B8B8B8"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinejoin="round"
                                                                                ></rect>
                                                                                <rect
                                                                                    x="35.25"
                                                                                    y="11.75"
                                                                                    width="14.5"
                                                                                    height="5.5"
                                                                                    rx="2.25"
                                                                                    transform="rotate(90 35.25 11.75)"
                                                                                    fill="#FFF"
                                                                                    stroke="#B8B8B8"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinejoin="round"
                                                                                ></rect>
                                                                                <rect
                                                                                    x="8.75"
                                                                                    y="22.75"
                                                                                    width="22.5"
                                                                                    height="6.5"
                                                                                    rx="2.25"
                                                                                    fill="#FFF"
                                                                                    stroke="#B8B8B8"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinejoin="round"
                                                                                ></rect>
                                                                                <path
                                                                                    className="icon-selected"
                                                                                    d="M20 6.333A6.67 6.67 0 0 0 13.334 13 6.67 6.67 0 0 0 20 19.667 6.67 6.67 0 0 0 26.667 13 6.669 6.669 0 0 0 20 6.333zm-1.333 10L15.333 13l.94-.94 2.394 2.387 5.06-5.06.94.946-6 6z"
                                                                                    fill="transparent"
                                                                                ></path>
                                                                                <path
                                                                                    className="icon-disabled"
                                                                                    d="M24.96 9.46l-1.42-1.42L20 11.59l-3.54-3.55-1.42 1.42L18.59 13l-3.55 3.54 1.42 1.42L20 14.41l3.54 3.55 1.42-1.42L21.41 13l3.55-3.54z"
                                                                                    fill="transparent"
                                                                                ></path>
                                                                            </svg>
                                                                        </Tooltip>
                                                                    )}
                                                                </Box>
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginTop: 3,
                        }}
                    >
                        <Typography component="p" marginRight="10px">
                            <Typography component="span">
                                {`Tổng tiền: `}
                            </Typography>

                            <Typography component="span" fontWeight="bold">
                                {`${(
                                    formValues.selected_seats.value.length *
                                    Number(selectedTrip.fare)
                                ).toLocaleString()} đ`}
                            </Typography>
                        </Typography>
                        <Button
                            variant={isError() ? "outlined" : "contained"}
                            disabled={isError()}
                            color="primary"
                            onClick={
                                !isError()
                                    ? () => dispatch(nextStep())
                                    : () => null
                            }
                        >
                            Tiếp
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
