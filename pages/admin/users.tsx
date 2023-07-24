// import AdminLayout from "@/components/layout/admin";

import {
    Button,
    // Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Container,
    Grid,
} from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import { useUser } from "@/hooks";
// import { IUserForm, IUserForm, NextpageWithLayout } from "../../models";
import React, { useState } from "react";
// import { UserForm, TableListUser, UserUpdateForm } from "@/components/User";
import { IUserDetail, IUserForm, NextpageWithLayout } from "@/models";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Head from "next/head";
// import PageTitleWrapper from "@/components/PageTitleWrapper";
import { TableListUser, UserForm, UserUpdateForm } from "@/components/users";
import { PureLightTheme } from "@/utils";

// import { SnackAlert, AlertContentProp } from "@/components/common";

const AdminUser: NextpageWithLayout = () => {
    const [showUserForm, setShowUserForm] = useState(false);
    const [selected, setSelected] = useState({});
    const [showUserUpdateForm, setShowUserUpdateForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleClose = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowUserForm(false);
    };
    const handleClose2 = (event: Object, reason: string) => {
        if (reason && reason == "backdropClick") return;
        setShowUserUpdateForm(false);
    };
    const handleEditClick = (data: IUserDetail) => {
        setSelected(data);
        setShowUserUpdateForm(true);
    };

    const hanleRemoveClick = (data: IUserDetail) => {
        setSelected(data);
        setShowAlert(true);
    };

    const { addUsers, listUser, removeUser, updateUser } = useUser({
        revalidateOnMount: true,
    });
    console.log(listUser);
    async function handleAddUser(data: IUserForm) {
        try {
            await addUsers(data);
            setShowUserForm(false);
        } catch (error: any) {
            if (error.response.status == 409) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Đã xảy ra lỗi vui long liên hệ quản trị viên");
            }
        }
    }
    async function handleDelelteSubmit(data: IUserDetail) {
        try {
            setShowAlert(false);
            await removeUser(data._id!);
        } catch (error) {
            console.log("Remove failse with error", error);
        }
    }

    async function handleUpdateSubmit(data: IUserDetail) {
        try {
            setShowUserUpdateForm(false);
            await updateUser(data);
        } catch (error) {
            console.log("Update failse with error: ", error);
        }
    }

    return (
        <>
            <Head>
                <title>Quản lý tài khoản</title>
            </Head>

            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            marginTop: PureLightTheme.spacing(2),
                            marginBottom: PureLightTheme.spacing(2),
                        }}
                    >
                        <Button
                            onClick={() => setShowUserForm(true)}
                            variant="contained"
                        >
                            Thêm mới tài khoản
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {listUser && (
                            <TableListUser
                                listUser={listUser}
                                handleEditClick={handleEditClick}
                                handleRemoveClick={hanleRemoveClick}
                            />
                        )}
                    </Grid>
                </Grid>

                {showUserForm && (
                    <UserForm
                        showUserForm={showUserForm}
                        handleClose={handleClose}
                        errorMsg={errorMsg}
                        onAdd={handleAddUser}
                        onCancel={() => setShowUserForm(false)}
                    />
                )}

                {showUserUpdateForm && (
                    <UserUpdateForm
                        showUserUpdateForm={showUserUpdateForm}
                        initData={selected as IUserDetail}
                        handleClose2={handleClose2}
                        onUpdate={handleUpdateSubmit}
                        activity="Update"
                        onCancel={() => setShowUserUpdateForm(false)}
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
                                handleDelelteSubmit(selected as IUserDetail)
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

AdminUser.Layout = SidebarLayout;

export default AdminUser;
