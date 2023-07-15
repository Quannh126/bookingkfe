import React from "react";
import { Box } from "@mui/system";
import { IconButton, Tooltip } from "@mui/material";

import { ICustomerDetail } from "@/models";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { Identifier } from "typescript";
export interface ITableListCustomerProps {
    listCustomer: [ICustomerDetail];
    // eslint-disable-next-line no-unused-vars
    handleEditClick: (data: ICustomerDetail) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveClick: (data: ICustomerDetail) => void;
}
type Row = ICustomerDetail;
export function TableListCustomer({
    listCustomer,
    handleEditClick,
    handleRemoveClick,
}: ITableListCustomerProps) {
    const [pageSize, setPageSize] = React.useState<number>(5);
    const columns: GridColDef[] = [
        {
            field: "name",
            type: "string",
            headerName: "Tên",
            width: 300,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "phonenumber",
            type: "string",
            headerName: "Số điện thoại",
            width: 200,
            headerAlign: "center",
            align: "center",
        },

        {
            field: "address",
            type: "number",
            width: 100,
            headerName: "Địa chỉ",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "email",
            type: "string",
            width: 150,
            headerName: "Email",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "times_booking",
            type: "string",
            width: 200,
            headerName: "Số lần đặt vé",
            headerAlign: "center",
            align: "center",
        },

        // {
        //     field: "status",
        //     type: "dateTime",
        //     width: 250,
        //     headerName: "Trạng thái",
        //     headerAlign: "center",
        //     align: "center",
        // },

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
                rows={listCustomer}
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
