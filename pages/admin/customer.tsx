import AdminLayout from "@/components/layout/admin";
import { Box } from "@mui/system";
import {
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import { useCustomer } from "@/hooks";
import { ICustomerForm, NextpageWithLayout } from "../../models";
import React, { useState } from "react";
import {
    CustomerForm,
    TableListCustomer,
    CustomerUpdateForm,
} from "@/components/customer";
import { ICustomerDetail } from "@/models";
// import { SnackAlert, AlertContentProp } from "@/components/common";

const AdminCustomer: NextpageWithLayout = () => {
    // const [showSnackAlert, setShowSnackAlert] = useState(
    //     {} as AlertContentProp
    // );

    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [selected, setSelected] = useState({});
    const [showCustomerUpdateForm, setShowCustomerUpdateForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowCustomerForm(false);
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowCustomerUpdateForm(false);
    };
    const handleEditClick = (data: ICustomerDetail) => {
        setSelected(data);
        setShowCustomerUpdateForm(true);
    };

    const hanleRemoveClick = (data: ICustomerDetail) => {
        setSelected(data);
        setShowAlert(true);
    };

    const { addCustomer, listCustomer, removeCustomer, updateCustomer } =
        useCustomer({
            revalidateOnMount: true,
        });

    async function handleAddCustomer(data: ICustomerForm) {
        try {
            await addCustomer(data);
            setShowCustomerForm(false);
            // setShowSnackAlert({
            //     content: "Thành công",
            //     typeAlert: "success",
            //     openInit: true,
            // });
        } catch (error: any) {
            if (error.response.status == 409) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Đã xảy ra lỗi vui long liên hệ quản trị viên");
            }
        }
    }
    async function handleDelelteSubmit(data: ICustomerDetail) {
        try {
            setShowAlert(false);
            await removeCustomer(data._id!);
        } catch (error) {
            console.log("Remove failse with error", error);
        }
    }

    async function handleUpdateSubmit(data: ICustomerDetail) {
        try {
            setShowCustomerUpdateForm(false);
            await updateCustomer(data);
        } catch (error) {
            console.log("Update failse with error: ", error);
        }
    }

    return (
        <Box>
            <Typography component="h1" variant="h5" p={2}>
                Quản lý danh sách khách hàng
            </Typography>

            <Button
                sx={{ ml: 2 }}
                onClick={() => setShowCustomerForm(true)}
                variant="outlined"
            >
                Thêm mới khách hàng
            </Button>

            <Dialog
                open={showCustomerForm}
                // TransitionComponent={Transition}
                keepMounted={false}
                onClose={handleClose}
                // maxWidth="lg"
                aria-labelledby="add-customer"
                aria-describedby="add-customer"
            >
                <CustomerForm
                    errorMsg={errorMsg}
                    onAdd={handleAddCustomer}
                    onCancel={() => setShowCustomerForm(false)}
                />
            </Dialog>
            <Dialog
                open={showCustomerUpdateForm}
                keepMounted={false}
                onClose={handleClose2}
                // maxWidth="lg"
                aria-labelledby="update-customer"
                aria-describedby="update-customer"
            >
                <CustomerUpdateForm
                    initData={selected as ICustomerDetail}
                    onUpdate={handleUpdateSubmit}
                    activity="Update"
                    onCancel={() => setShowCustomerUpdateForm(false)}
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
                            handleDelelteSubmit(selected as ICustomerDetail)
                        }
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {listCustomer && (
                <TableListCustomer
                    listCustomer={listCustomer}
                    handleEditClick={handleEditClick}
                    handleRemoveClick={hanleRemoveClick}
                />
            )}
        </Box>
    );
};

AdminCustomer.Layout = AdminLayout;

export default AdminCustomer;
