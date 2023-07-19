// import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import {
    Button,
    // Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import { useCar } from "@/hooks";
import { ICarForm, NextpageWithLayout } from "../../models";
import React, { useRef, useState } from "react";
import { CarForm, TableListCar, CarUpdateForm } from "@/components/cars";
import { ICarDetail } from "@/models";
import { CSVLink } from "react-csv";
import GetAppIcon from "@mui/icons-material/GetApp";
// import useMutation from "@/hooks/useUpload";
import { axiosClient } from "@/api-client";
import axios from "axios";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Footer from "@/components/Footer";
// import TableListCar from "@/components/cars/table-list-cars";
const AdminCars: NextpageWithLayout = () => {
    const [showCarForm, setShowCarForm] = useState(false);
    const [selected, setSelected] = useState({});
    const [showCarUpdateForm, setShowCarUpdateForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowCarForm(false);
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowCarUpdateForm(false);
    };
    const handleEditClick = (data: ICarDetail) => {
        setSelected(data);
        setShowCarUpdateForm(true);
    };

    const hanleRemoveClick = (data: ICarDetail) => {
        setSelected(data);
        setShowAlert(true);
    };

    const { addCars, listCar, removeCar, updateCar } = useCar({
        revalidateOnMount: true,
    });

    async function handleAddCar(data: ICarForm) {
        try {
            if (data.attachment && data.attachment.length > 0) {
                const imgAmount = data.attachment?.length;
                const fileName = data.attachment[0].name;
                const result = await addCars(data);
                console.log(result);
                const urlUpload: any = await axiosClient.get(
                    `/upload/${result._id}/${fileName}`
                );
                //console.log(urlUpload.data.url);
                for (let i = 0; i < imgAmount!; i++) {
                    // const formData = new FormData();
                    // formData.append("file", data.attachment![i]);
                    // const file = data.attachment![i];
                    await axios({
                        method: "PUT",
                        url: urlUpload.url,
                        data: data.attachment![i],
                        headers: { "Content-Type": data.attachment![i].type },
                    });
                    await updateCar({
                        ...data,
                        _id: result._id,
                        imgPath: urlUpload.url.split("?")[0],
                    } as ICarDetail);
                }
            } else {
                await addCars(data);
            }

            setShowCarForm(false);
        } catch (error) {
            console.log("failed to login");
        }
    }

    async function handleUpdateSubmit(data: ICarDetail) {
        try {
            if (data.attachment && data.attachment.length > 0) {
                const imgAmount = data.attachment?.length;
                const fileName = data.attachment[0].name;
                const urlUpload: any = await axiosClient.get(
                    `/upload/${data._id}/${fileName}`
                );

                for (let i = 0; i < imgAmount!; i++) {
                    // const formData = new FormData();
                    // formData.append("file", data.attachment![i]);
                    await axios({
                        method: "PUT",
                        url: urlUpload.url,
                        data: data.attachment![i],
                        headers: { "Content-Type": data.attachment![i].type },
                    });
                    await updateCar({
                        ...data,
                        imgPath: urlUpload.url.split("?")[0],
                    });
                }
            } else {
                await updateCar({
                    ...data,
                });
            }

            setShowCarUpdateForm(false);
        } catch (error) {
            console.log("Update failse with error: ", error);
        }
    }
    async function handleDelelteSubmit(data: ICarDetail) {
        try {
            setShowAlert(false);
            await removeCar(data._id!);
        } catch (error) {
            console.log("Remove failse with error", error);
        }
    }

    const csvLinkRef = useRef<
        CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
    >(null); // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    const [data, setData] = useState<any[]>([]);
    const headers = [
        { label: "Tên", key: "name" },
        { label: "Kiểu xe", key: "type_car" },
        { label: "Số ghê", key: "capacity" },
        { label: "Biển số xe", key: "license_plate" },
        { label: "Tên tài xế", key: "driver_name" },
        { label: "Số điện thoại", key: "phonenumber" },
        { label: "Trạng thái", key: "status" },
    ];
    const hanldeExportButton = async () => {
        const data: any[] | [] = await listCar!.map(
            ({
                name,
                type_car,
                capacity,
                license_plate,
                driver_name,
                phonenumber,
                status,
            }) => ({
                name,
                type_car,
                capacity,
                license_plate,
                driver_name,
                phonenumber,
                status,
            })
        );
        setData(data);
        csvLinkRef?.current?.link.click();
    };

    return (
        <Box>
            {/* <Typography component="h1" variant="h4" p={2}>
                Quản lý xe
            </Typography> */}

            <Button
                sx={{ ml: 2 }}
                onClick={() => setShowCarForm(true)}
                variant="outlined"
            >
                Thêm xe
            </Button>
            <CSVLink
                headers={headers}
                data={data}
                className="exportButton"
                filename="Danh-sach-xe.csv"
                ref={csvLinkRef}
            ></CSVLink>
            <Button
                sx={{ ml: 2 }}
                color="primary"
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={hanldeExportButton}
            >
                Export As CSV
            </Button>
            <Dialog
                open={showCarForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose}
                // maxWidth="lg"
                aria-labelledby="add-car"
                aria-describedby="add-car"
            >
                <CarForm
                    onAdd={handleAddCar}
                    onCancel={() => setShowCarForm(false)}
                />
            </Dialog>
            <Dialog
                open={showCarUpdateForm}
                keepMounted={false}
                onClose={handleClose2}
                // maxWidth="lg"
                aria-labelledby="update-car"
                aria-describedby="update-car"
            >
                <CarUpdateForm
                    initData={selected as ICarDetail}
                    onUpdate={handleUpdateSubmit}
                    activity="Update"
                    onCancel={() => setShowCarUpdateForm(false)}
                    // setFilesToUpload={setFilesToUpload}
                />
            </Dialog>
            <Dialog open={showAlert} keepMounted>
                <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc xoá thông tin bản ghi không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAlert(false)}>Huỷ</Button>
                    <Button
                        onClick={() =>
                            handleDelelteSubmit(selected as ICarDetail)
                        }
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {listCar && (
                <TableListCar
                    listCar={listCar}
                    handleEditClick={handleEditClick}
                    handleRemoveClick={hanleRemoveClick}
                />
            )}
            <Footer />
        </Box>
    );
};

AdminCars.Layout = SidebarLayout;

export default AdminCars;
