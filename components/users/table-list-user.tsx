import React from "react";
import { Box } from "@mui/system";
import { IconButton, Tooltip } from "@mui/material";

import { IUserDetail } from "@/models";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { Identifier } from "typescript";

export interface ITableListUserProps {
    listUser: [IUserDetail];
    // eslint-disable-next-line no-unused-vars
    handleEditClick: (data: IUserDetail) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveClick: (data: IUserDetail) => void;
}

type Row = IUserDetail;
export function TableListUser({
    listUser,
    handleEditClick,
    handleRemoveClick,
}: ITableListUserProps) {
    const [pageSize, setPageSize] = React.useState<number>(5);
    // _id: string;
    // fullname: string;
    // phone: string;
    // username: string;
    // role: string;
    //email: string
    // date: Date;
    // avatar?: string;

    // status: string;
    const columns: GridColDef[] = [
        {
            field: "username",
            type: "string",
            width: 200,
            headerName: "Tên đăng nhập",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "fullname",
            type: "string",
            headerName: "Tên",
            width: 300,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "email",
            type: "string",
            headerName: "Email",
            width: 300,
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
            field: "role",
            type: "string",
            width: 150,
            headerName: "Vai trò",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "avatar",
            // type: "string",
            headerName: "Ảnh",
            width: 200,
            headerAlign: "center",
            renderCell: (cellValue: GridRenderCellParams<Row>) => {
                if (!cellValue.value || cellValue.value.toString() == "") {
                    return <Box></Box>;
                }
                return (
                    <Box
                        component="img"
                        sx={{
                            height: 120,
                            width: 200,
                        }}
                        src={cellValue.value.toString()}
                    />
                );
            },
        },
        {
            field: "stringDate",
            type: "string",
            width: 200,
            headerName: "Ngày lập",
            headerAlign: "center",
            align: "center",
            // renderCell: (cellValue: GridRenderCellParams<Row>)=> {
            //     if (!cellValue.value) {
            //         return <Box></Box>;
            //     }
            //     return (
            //         <Box>{`${moment(cellValue.value).format("DD/MM/YYYY")}`}</Box>

            //     );
            // },
        },

        {
            field: "status",
            type: "trạng thái",
            width: 250,
            headerName: "Trạng thái",
            headerAlign: "center",
            align: "center",
        },

        {
            field: "actions",
            // type: "actions",
            headerName: "Actions",
            headerAlign: "center",
            width: 150,
            align: "center",
            sortable: false,
            renderCell: (cellValue: GridRenderCellParams<Row>) => {
                return (
                    <Box>
                        <Tooltip title="Sửa" arrow placement="left-start">
                            <IconButton
                                aria-label="Edit"
                                onClick={() => {
                                    handleEditClick(cellValue.row);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Xoá" arrow placement="right-end">
                            <IconButton
                                aria-label="Delete"
                                onClick={() => handleRemoveClick(cellValue.row)}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];
    return (
        <>
            <DataGrid
                sx={{
                    ".MuiDataGrid-columnHeaders": {
                        backgroundColor: "rgb(141 147 225 / 87%)",
                    },
                }}
                rowHeight={60}
                columns={columns}
                rows={listUser}
                getRowId={(row) => row._id}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                autoHeight={true}
                componentsProps={{
                    pagination: {
                        labelRowsPerPage: "Số dòng trong trang",
                    },
                }}
                // components={{
                //     Toolbar: CustomToolbar,
                // }}
            />
        </>
    );
}
