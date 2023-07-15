// import AdminLayout from "@/components/layout/admin";

import {
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Container,
    Grid,
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
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
import PageTitleWrapper from "@/components/PageTitleWrapper";

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
        <>
            <Head>
                <title>Quản lý khách hàng</title>
            </Head>
            <PageTitleWrapper>
                <Typography component="h1" variant="h5">
                    Quản lý khách hàng
                </Typography>
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Button
                            onClick={() => setShowCustomerForm(true)}
                            variant="outlined"
                        >
                            Thêm mới khách hàng
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {listCustomer && (
                            <TableListCustomer
                                listCustomer={listCustomer}
                                handleEditClick={handleEditClick}
                                handleRemoveClick={hanleRemoveClick}
                            />
                        )}
                    </Grid>
                </Grid>

                {showCustomerForm && (
                    <CustomerForm
                        showCustomerForm={showCustomerForm}
                        handleClose={handleClose}
                        errorMsg={errorMsg}
                        onAdd={handleAddCustomer}
                        onCancel={() => setShowCustomerForm(false)}
                    />
                )}

                {showCustomerUpdateForm && (
                    <CustomerUpdateForm
                        showCustomerUpdateForm={showCustomerUpdateForm}
                        initData={selected as ICustomerDetail}
                        handleClose2={handleClose2}
                        onUpdate={handleUpdateSubmit}
                        activity="Update"
                        onCancel={() => setShowCustomerUpdateForm(false)}
                    />
                )}

                <Dialog open={showAlert} keepMounted>
                    <DialogTitle id="alert-dialog-title">
                        {"Thông báo"}
                    </DialogTitle>
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
            </Container>
        </>
    );
};

AdminCustomer.Layout = SidebarLayout;

export default AdminCustomer;
