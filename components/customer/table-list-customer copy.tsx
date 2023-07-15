import React, { useState } from "react";

import {
    Paper,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    IconButton,
    TableFooter,
    TablePagination,
} from "@mui/material";
import TablePaginationActions from "./table-with-paging";

import { ICustomerDetail } from "@/models";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
// import { Identifier } from "typescript";
export interface ITableListCustomerProps {
    listCustomer: [ICustomerDetail];
    // eslint-disable-next-line no-unused-vars
    handleEditClick: (data: ICustomerDetail) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveClick: (data: ICustomerDetail) => void;
}

export function TableListCustomer({
    listCustomer,
    handleEditClick,
    handleRemoveClick,
}: ITableListCustomerProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - listCustomer.length)
            : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow
                            sx={{
                                "th": {
                                    backgroundColor: "rgb(141 147 225 / 87%)",
                                },
                            }}
                        >
                            <TableCell align="center">Tên</TableCell>
                            <TableCell align="center">Số điện thoại</TableCell>
                            <TableCell align="center">Đại chỉ</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Số lần đặt vé</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? listCustomer.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : listCustomer
                        ).map((customer: ICustomerDetail, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    {customer.name}
                                </TableCell>
                                <TableCell align="center">
                                    {`${customer.phonenumber}`}
                                </TableCell>
                                <TableCell align="center">
                                    {customer.address}
                                </TableCell>
                                <TableCell align="center">
                                    {customer.email}
                                </TableCell>
                                <TableCell align="center">
                                    {`${customer.times_booking}`}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="Edit"
                                        onClick={() =>
                                            handleEditClick(customer)
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={() =>
                                            handleRemoveClick(customer)
                                        }
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: "All", value: -1 },
                                ]}
                                colSpan={6}
                                count={listCustomer.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        "aria-label": "rows per page",
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
