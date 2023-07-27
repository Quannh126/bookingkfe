import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    // Dialog,
    // DialogActions,
    // DialogContent,
    // DialogTitle,
    Grid,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {
    useEffect,
    // useRef,
    useState,
} from "react";
import {} from "@mui/material";
import clsx from "clsx";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IBookingTrip, { ISeatDetail } from "@/models/Book/book-trip";
import { NameValue } from "@/models";
import { PureLightTheme } from "@/utils";
import EditIcon from "@mui/icons-material/Edit";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { toast } from "react-toastify";
// import PrintIcon from "@mui/icons-material/Print";
// import ReactToPrint, { useReactToPrint } from "react-to-print";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import {
    DataGrid,
    GridColDef,
    // GridToolbar,
    GridToolbarContainer,
    GridToolbarExport,
    // GridPrintExportOptions,
} from "@mui/x-data-grid";
// import { FunctionalComponentToPrint } from "./ComponentToPrint";
export interface ISeatSelectionProps {
    selectedSeats: Array<number>;
    selectedSeatsBooked: Array<number>;
    // eslint-disable-next-line no-unused-vars
    handleChooseSwapSeat: (seat: number) => void;
    handleSwapClick: () => void;
    setSelectedSeatsBooked: React.Dispatch<React.SetStateAction<Array<number>>>;
    setSelectedSeats: React.Dispatch<React.SetStateAction<Array<number>>>;
    setShowListTrip: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
    setSwapId: React.Dispatch<React.SetStateAction<string>>;
    setSwapSeat: React.Dispatch<React.SetStateAction<number>>;
    swapSeat: number;
    singleSelectMode: boolean;
    tripDetail: IBookingTrip;
    // eslint-disable-next-line no-unused-vars
    handleAddClick: (selectedSeats: Array<number>) => void;
    listDropoffAndPickUp: {
        pickup: Array<NameValue>;
        dropoff: Array<NameValue>;
    };
    // eslint-disable-next-line no-unused-vars
    handleUpdateClick: (selectedSeats: Array<number>) => void;
}

type ICustomerCheckList = {
    _id: number;
    seat: string;
    name: string;
    phone: string;
    dropoff: string;
    pickup: string;
    isPayment: string;
};
export default function SeatSelection({
    tripDetail,
    listDropoffAndPickUp,
    selectedSeats,
    setSelectedSeats,
    handleAddClick,
    setShowListTrip,
    selectedSeatsBooked,
    setSelectedSeatsBooked,
    handleUpdateClick,
    // setSingleSelectMode,
    singleSelectMode,
    handleSwapClick,
    setSwapId,
    handleChooseSwapSeat,
    setSwapSeat,
    swapSeat,
    setSingleSelectMode,
}: ISeatSelectionProps) {
    const capacity = Number(tripDetail!.car.capacity);
    const [seatDetail, setSeatDetail] = useState(tripDetail);
    // const [errorText, setErrorText] = useState("");
    const [showList, setShowList] = useState(false);
    const [pageSize, setPageSize] = useState<number>(5);
    const getNameLocatioin = (isDropoff: boolean, value: any): string => {
        if (isDropoff) {
            return listDropoffAndPickUp.dropoff
                .find((item) => item.value === `${value}`)!
                .name.split("-")[1];
        } else {
            return listDropoffAndPickUp.pickup
                .find((item) => item.value === `${value}`)!
                .name.split("-")[1];
        }
    };
    let listInit: ICustomerCheckList[] = tripDetail.seat_detail.map(
        (seat: ISeatDetail, index) => {
            return {
                _id: index,
                seat: seat.seat,
                name: seat.customer.name,
                phone: `'${seat.customer.phonenumber} `,
                dropoff: getNameLocatioin(true, seat.booking.dropoff_point),
                pickup: getNameLocatioin(false, seat.booking.pickup_point),
                isPayment:
                    seat.booking.status_payment === "paid"
                        ? "Đã thanh toán"
                        : "",
            };
        }
    );
    // const transformedData: IDataUser[] = users.map((user: any) => {
    //     return {
    //         _id: user._id,
    //         fullname: user.fullname,
    //         phone: user.phone,
    //         username: user.username,
    //         role: user.role,
    //         email: user.email || "",
    //         date: new Date(user.date),
    //         avatar: user.avatar,
    //         stringDate: moment(user.date).format("DD/MM/YYYY, hh:mm"),
    //         status: user.status,
    //     };
    // });
    const [listCustomer, setListCustomer] =
        useState<ICustomerCheckList[]>(listInit);
    // const [showError, setShowError] = useState(false);
    // const [showTicket, setShowTicket] = useState(false);
    // function handleCloseTicket(event: Object, reason: string) {
    //     if (reason && reason == "backdropClick") return;
    //     setShowTicket(false);
    //     // setVisibleAlertText(false);
    //     // setAlertText("");
    // }
    function handleClickToSeat(seatNumber: number) {
        if (selectedSeats.includes(seatNumber)) {
            // //console.log(selectedSeats + "---" + seatNumber);
            const listSelected = selectedSeats.filter(
                (seat: number) => seat !== seatNumber
            );
            setSelectedSeats(listSelected);
            setSelectedSeatsBooked([]);
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
            setSelectedSeatsBooked([]);
        }
    }
    // const componentRef = useRef(null);
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // });
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport
                    csvOptions={{
                        utf8WithBom: true,
                        includeHeaders: true,
                        fileName: "Danh sách",
                    }}
                    printOptions={{
                        hideFooter: true,
                        hideToolbar: true,
                    }}
                />
            </GridToolbarContainer>
        );
    }
    function handleClickToSeatBooked(seatNumber: number) {
        const listSeatSameCustomer: Array<number> = [] as Array<number>;
        const customer_id = tripDetail.seat_detail.find(
            (seat) => seat.seat === `${seatNumber}`
        )?.customer._id;
        tripDetail.seat_detail.forEach((seat) => {
            if (seat.customer._id === customer_id) {
                listSeatSameCustomer.push(Number(seat.seat));
            }
        });

        if (selectedSeatsBooked.includes(seatNumber)) {
            // //console.log(selectedSeatsBooked + "---" + seatNumber);
            const listSelected = selectedSeats.filter(
                (seat: number) => seat !== seatNumber
            );
            setSelectedSeatsBooked(listSelected);
            setSelectedSeats([]);
        } else {
            setSelectedSeatsBooked(listSeatSameCustomer);
            setSelectedSeats([]);
        }
    }

    const columns: GridColDef[] = [
        {
            field: "seat",
            type: "string",
            headerName: "Số ghế",
            width: 100,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "name",
            type: "string",
            headerName: "Tên khách",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "phone",
            type: "string",
            headerName: "Số điện thoại",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "dropoff",
            type: "string",
            headerName: "Điểm trả",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "pickup",
            type: "string",
            headerName: "Điểm đón",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "isPayment",
            type: "string",
            headerName: "Thanh toán",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
    ];
    useEffect(() => {
        setSeatDetail(tripDetail);
        const getNameLocatioin1 = (isDropoff: boolean, value: any): string => {
            if (isDropoff) {
                return listDropoffAndPickUp.dropoff
                    .find((item) => item.value === `${value}`)!
                    .name.split("-")[1];
            } else {
                return listDropoffAndPickUp.pickup
                    .find((item) => item.value === `${value}`)!
                    .name.split("-")[1];
            }
        };
        const newList: ICustomerCheckList[] = tripDetail.seat_detail.map(
            (seat: ISeatDetail, index) => {
                return {
                    _id: index,
                    seat: seat.seat,
                    name: seat.customer.name,
                    phone: `'${seat.customer.phonenumber}`,
                    dropoff: getNameLocatioin1(
                        true,
                        seat.booking.dropoff_point
                    ),
                    pickup: getNameLocatioin1(false, seat.booking.pickup_point),
                    isPayment:
                        seat.booking.status_payment === "paid"
                            ? "Đã thanh toán"
                            : "",
                };
            }
        );
        setListCustomer(newList);

        //tripDetail.seat_detail.map()
        // //console.log(tripDetail);
    }, [tripDetail, listDropoffAndPickUp.dropoff, listDropoffAndPickUp.pickup]);

    return (
        <>
            {/* <Dialog
                open={showTicket}
                keepMounted={false}
                onClose={handleCloseTicket}
                scroll="body"
            >
                <DialogTitle
                    id="ticket"
                    display="flex"
                    sx={{ justifyContent: "center" }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        In vé
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <FunctionalComponentToPrint
                        ref={componentRef}
                        seatBookedSeleted={selectedSeatsBooked}
                        tripDetail={tripDetail}
                        listDropoffAndPickUp={listDropoffAndPickUp}
                    />
                </DialogContent>

                <DialogActions>
                    <ReactToPrint
                        trigger={() => (
                            <IconButton onClick={handlePrint}>
                                <PrintIcon
                                    sx={{
                                        color: PureLightTheme.colors.primary
                                            .main,
                                    }}
                                />
                            </IconButton>
                        )}
                        content={() => componentRef.current}
                    />

                    <Button onClick={() => setShowTicket(false)}>Close</Button>
                </DialogActions>
            </Dialog> */}

            <Grid container>
                <Grid item xs={12} display="flex">
                    <Tooltip title="Trở lại" arrow>
                        <Button
                            aria-label="Trở lại"
                            variant="contained"
                            onClick={() => {
                                setShowListTrip(true);
                                setSelectedSeats([]);
                            }}
                            startIcon={<ArrowBackIosIcon />}
                            sx={{ ml: 1 }}
                        >
                            Trở lại
                        </Button>
                    </Tooltip>
                    {!showList ? (
                        <Tooltip title="Danh sách" arrow>
                            <Button
                                aria-label="Trở lại"
                                variant="contained"
                                onClick={() => {
                                    setShowList(true);
                                }}
                                startIcon={<FormatListBulletedTwoToneIcon />}
                                sx={{ ml: 1 }}
                            >
                                Xem danh sách
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Đặt vé" arrow>
                            <Button
                                aria-label="Trở lại"
                                variant="contained"
                                onClick={() => {
                                    setShowList(false);
                                }}
                                startIcon={<FormatListBulletedTwoToneIcon />}
                                sx={{ ml: 1 }}
                            >
                                Xem đặt vé
                            </Button>
                        </Tooltip>
                    )}
                </Grid>
                {showList && (
                    <DataGrid
                        sx={{
                            ".MuiDataGrid-columnHeaders": {
                                backgroundColor: "rgb(141 147 225 / 87%)",
                            },
                            marginTop: PureLightTheme.spacing(2),
                            marginLeft: PureLightTheme.spacing(1),
                        }}
                        rowHeight={60}
                        columns={columns}
                        rows={listCustomer}
                        getRowId={(row) => row._id}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                        autoHeight={true}
                        componentsProps={{
                            pagination: {
                                labelRowsPerPage: "Số dòng trong trang",
                            },
                        }}
                        components={{ Toolbar: CustomToolbar }}
                        // slots={{ toolbar: GridToolbar }}

                        // components={{
                        //     Toolbar: CustomToolbar,
                        // }}
                    />
                )}
                {!showList &&
                    Array.from(Array(capacity).keys()).map(
                        (seat: number, index) => {
                            let isBooked = seatDetail.seat_detail.some(
                                (seat) => seat.seat === `${index + 1}`
                            );
                            let isSelected = false;
                            let isPaid =
                                seatDetail.seat_detail.find(
                                    (item) => item.seat === `${index + 1}`
                                )?.booking.status_payment === "paid";
                            if (selectedSeats.includes(seat + 1)) {
                                isSelected = true;
                            }
                            if (selectedSeatsBooked.includes(seat + 1)) {
                                isSelected = true;
                            }
                            let isSwapSeat = seat + 1 === swapSeat;
                            return (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                    <Box>
                                        <Card
                                            elevation={2}
                                            sx={{
                                                margin: "10px",
                                                width: "auto",
                                            }}
                                            className={clsx({
                                                selected: isSelected,
                                                booked: isBooked,
                                                "my-card selected": isSelected,
                                                "my-card": !isSelected,
                                                focus: isSwapSeat,
                                            })}
                                        >
                                            <CardActionArea
                                                // pl={3}
                                                onClick={async () => {
                                                    if (!singleSelectMode) {
                                                        handleClickToSeat(
                                                            seat + 1
                                                        );
                                                        if (isBooked) {
                                                            handleClickToSeatBooked(
                                                                seat + 1
                                                            );
                                                        }
                                                    } else {
                                                        if (
                                                            seat + 1 !==
                                                            swapSeat
                                                        ) {
                                                            handleChooseSwapSeat(
                                                                seat + 1
                                                            );
                                                        } else {
                                                            setSwapSeat(-1);
                                                            setSingleSelectMode(
                                                                false
                                                            );
                                                        }
                                                    }
                                                }}
                                                sx={{
                                                    padding: "12px 16px",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: "230px",
                                                    }}
                                                >
                                                    <Box
                                                        display="flex"
                                                        sx={{
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Box
                                                            display="flex"
                                                            sx={{
                                                                alignItems:
                                                                    "baseline",
                                                            }}
                                                            color={
                                                                !isBooked
                                                                    ? PureLightTheme
                                                                          .colors
                                                                          .primary
                                                                          .main
                                                                    : PureLightTheme
                                                                          .colors
                                                                          .warning
                                                                          .dark
                                                            }
                                                        >
                                                            <Typography variant="body2">
                                                                {`Ghế: `}
                                                            </Typography>
                                                            <Typography
                                                                variant="h4"
                                                                ml={1}
                                                            >
                                                                {(
                                                                    seat + 1
                                                                ).toString()}
                                                            </Typography>
                                                        </Box>
                                                        {isBooked && (
                                                            <Box
                                                                sx={{
                                                                    backgroundColor:
                                                                        isPaid
                                                                            ? PureLightTheme
                                                                                  .colors
                                                                                  .success
                                                                                  .light
                                                                            : "white",
                                                                    borderRadius:
                                                                        "5px",
                                                                    padding:
                                                                        "5px 6px",
                                                                    border: `2px solid ${
                                                                        !isPaid
                                                                            ? PureLightTheme
                                                                                  .colors
                                                                                  .warning
                                                                                  .light
                                                                            : PureLightTheme
                                                                                  .colors
                                                                                  .success
                                                                                  .light
                                                                    }`,
                                                                }}
                                                            >
                                                                <Typography
                                                                    color={
                                                                        !isPaid
                                                                            ? "black"
                                                                            : "white"
                                                                    }
                                                                    variant="h6"
                                                                >
                                                                    {isPaid
                                                                        ? "Đã thanh toán"
                                                                        : "Chưa thanh toán"}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    {isBooked && (
                                                        <Box mt={1}>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    {`Tên: `}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {
                                                                        seatDetail.seat_detail.find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                            ?.customer
                                                                            .name
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    {`Số điện thoại: `}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {seatDetail.seat_detail
                                                                        .find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                        ?.customer.phonenumber.toString()}
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    {`Giá: `}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {`${Number(
                                                                        seatDetail.seat_detail.find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                            ?.booking
                                                                            .fare
                                                                    ).toLocaleString()} VNĐ `}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color={
                                                                        PureLightTheme
                                                                            .colors
                                                                            .error
                                                                            .light
                                                                    }
                                                                >{`(${
                                                                    seatDetail.seat_detail.filter(
                                                                        (
                                                                            seat
                                                                        ) =>
                                                                            seat
                                                                                .customer
                                                                                ._id ==
                                                                            seatDetail.seat_detail.find(
                                                                                (
                                                                                    seat
                                                                                ) =>
                                                                                    seat.seat ===
                                                                                    `${
                                                                                        index +
                                                                                        1
                                                                                    }`
                                                                            )
                                                                                ?.customer
                                                                                ._id
                                                                    ).length
                                                                }G)`}</Typography>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "flex-end",
                                                                    mt: 1,
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {getNameLocatioin(
                                                                        false,
                                                                        seatDetail.seat_detail.find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                            ?.booking
                                                                            .pickup_point
                                                                    )}
                                                                </Typography>
                                                                <Avatar
                                                                    sx={{
                                                                        ml: 1,
                                                                        height: "100%",
                                                                        width: "auto",
                                                                        backgroundColor:
                                                                            PureLightTheme
                                                                                .colors
                                                                                .primary
                                                                                .main,
                                                                    }}
                                                                >
                                                                    <ArrowDropUpIcon
                                                                        sx={{
                                                                            height: "1rem",
                                                                            width: "1rem",
                                                                        }}
                                                                    />
                                                                </Avatar>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                sx={{
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    ml={1}
                                                                >
                                                                    {getNameLocatioin(
                                                                        true,
                                                                        seatDetail.seat_detail.find(
                                                                            (
                                                                                seat
                                                                            ) =>
                                                                                seat.seat ===
                                                                                `${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                        )
                                                                            ?.booking
                                                                            .dropoff_point
                                                                    )}
                                                                </Typography>
                                                                <Avatar
                                                                    sx={{
                                                                        ml: 1,
                                                                        height: "100%",
                                                                        width: "auto",
                                                                        backgroundColor:
                                                                            PureLightTheme
                                                                                .colors
                                                                                .primary
                                                                                .main,
                                                                    }}
                                                                >
                                                                    <ArrowDropDownIcon
                                                                        sx={{
                                                                            height: "1rem",
                                                                            width: "1rem",
                                                                        }}
                                                                    />
                                                                </Avatar>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </CardActionArea>
                                            {isSelected && isBooked && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-evenly",
                                                        position: "absolute",
                                                        opacity: 1,
                                                        bottom: "20px",
                                                        left: 0,
                                                        width: "100%",
                                                    }}
                                                >
                                                    {/* <Tooltip title="In vé xe" arrow>
                                                    <IconButton
                                                        aria-label="Print"
                                                        onClick={(e) => {
                                                            if (
                                                                selectedSeatsBooked.length ==
                                                                0
                                                            ) {
                                                                setErrorText(
                                                                    "Chỉ có thể cập nhật những chỗ đã được đặt"
                                                                );
                                                                setShowError(
                                                                    true
                                                                );
                                                            } else {
                                                                setShowError(
                                                                    false
                                                                );
                                                                // setShowTicket(
                                                                //     true
                                                                // );
                                                            }
                                                            e.stopPropagation();
                                                        }}
                                                        className="button-container"
                                                    >
                                                        <PrintIcon
                                                            sx={{
                                                                color: PureLightTheme
                                                                    .colors
                                                                    .primary
                                                                    .main,
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Tooltip> */}
                                                    <Tooltip
                                                        title="Cập nhật"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            aria-label="Edit"
                                                            onClick={(e) => {
                                                                // //console.log(
                                                                //     "click"
                                                                // );
                                                                if (
                                                                    selectedSeatsBooked.length ==
                                                                    0
                                                                ) {
                                                                    toast.error(
                                                                        "Chỉ có thể cập nhật những chỗ đã được đặt"
                                                                    );
                                                                    // setErrorText(

                                                                    // );
                                                                    // setShowError(
                                                                    //     true
                                                                    // );
                                                                } else {
                                                                    // setShowError(
                                                                    //     false
                                                                    // );
                                                                    handleUpdateClick(
                                                                        selectedSeats
                                                                    );
                                                                }
                                                                e.stopPropagation();
                                                            }}
                                                            className="button-container"
                                                        >
                                                            <EditIcon
                                                                sx={{
                                                                    color: PureLightTheme
                                                                        .colors
                                                                        .primary
                                                                        .main,
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title="Chuyển chỗ"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="Changeseat"
                                                            onClick={async (
                                                                e
                                                            ) => {
                                                                setSwapSeat(
                                                                    seat + 1
                                                                );
                                                                handleSwapClick();

                                                                let booking_id =
                                                                    await seatDetail.seat_detail.find(
                                                                        (
                                                                            seat
                                                                        ) =>
                                                                            seat.seat ===
                                                                            `${
                                                                                index +
                                                                                1
                                                                            }`
                                                                    )?.booking
                                                                        ._id!;
                                                                setSwapId(
                                                                    booking_id
                                                                );
                                                                e.stopPropagation();
                                                            }}
                                                            className="button-container"
                                                        >
                                                            <SwapHorizIcon
                                                                sx={{
                                                                    color: PureLightTheme
                                                                        .colors
                                                                        .primary
                                                                        .main,
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            )}
                                            {!isBooked && (
                                                <Tooltip title="Đặt vé" arrow>
                                                    <IconButton
                                                        aria-label="Đặt vé"
                                                        sx={{
                                                            position:
                                                                "absolute",

                                                            opacity: "1",
                                                            top: "5px",
                                                            right: "5px",
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (
                                                                selectedSeats.length !=
                                                                0
                                                            ) {
                                                                if (
                                                                    !selectedSeats.includes(
                                                                        seat + 1
                                                                    )
                                                                ) {
                                                                    handleClickToSeat(
                                                                        seat + 1
                                                                    );
                                                                    // setShowError(
                                                                    //     false
                                                                    // );
                                                                    handleAddClick(
                                                                        selectedSeats
                                                                    );
                                                                } else {
                                                                    // setShowError(
                                                                    //     false
                                                                    // );
                                                                    handleAddClick(
                                                                        selectedSeats
                                                                    );
                                                                }
                                                            } else {
                                                                // setErrorText(
                                                                //     "Vui lòng chọn chỗ ngồi"
                                                                // );
                                                                // setShowError(
                                                                //     true
                                                                // );
                                                                handleClickToSeat(
                                                                    seat + 1
                                                                );
                                                                // setShowError(false);
                                                                handleAddClick(
                                                                    selectedSeats
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <AddIcon
                                                            sx={{
                                                                color: PureLightTheme
                                                                    .colors
                                                                    .primary
                                                                    .main,
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Card>
                                    </Box>
                                </Grid>
                            );
                        }
                    )}
            </Grid>
        </>
    );
}
