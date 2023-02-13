import React from "react";
import { Box } from "@mui/system";
import {
    IconButton,
    Tooltip,
    // TableCell,
    // TableHead,
    // TableBody,
    // Paper,
    // TableContainer,
    // Table,
    // TableRow,
    // TableFooter,
    // TablePagination,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { ICarDetail } from "@/models";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

// import { Identifier } from "typescript";
export interface ITableListCarProps {
    listCar: [ICarDetail];
    // eslint-disable-next-line no-unused-vars
    handleEditClick: (data: ICarDetail) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveClick: (data: ICarDetail) => void;
}
type Row = ICarDetail;
// function CustomToolbar() {
//     return (
//         <GridToolbarContainer>
//             <GridToolbarExport />
//         </GridToolbarContainer>
//     );
// }
export function TableListCar({
    listCar,
    handleEditClick,
    handleRemoveClick,
}: ITableListCarProps) {
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
            field: "type_car",
            type: "string",
            headerName: "Kiểu xe",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "capacity",
            type: "number",
            width: 150,
            headerName: "Số ghế",
            headerAlign: "center",
        },
        {
            field: "license_plate",
            type: "string",
            width: 150,
            headerName: "Biển số xe",
            headerAlign: "center",
        },
        {
            field: "driver_name",
            type: "string",
            width: 200,
            headerName: "Tên tài xế",
            headerAlign: "center",
        },
        {
            field: "phonenumber",
            type: "string",
            width: 150,
            headerName: "Số điện thoại",
            headerAlign: "center",
        },
        {
            field: "status",
            type: "dateTime",
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
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Box
                m={2}
                sx={{ height: "auto", overflow: "auto", width: "1680px" }}
            >
                <DataGrid
                    sx={{
                        ".MuiDataGrid-columnHeaders": {
                            backgroundColor: "rgb(141 147 225 / 87%)",
                        },
                    }}
                    columns={columns}
                    rows={listCar}
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
            </Box>
        </Box>
    );
}
