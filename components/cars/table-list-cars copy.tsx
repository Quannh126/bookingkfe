import React, { useState } from "react";
import { Box } from "@mui/system";
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
    Tooltip,
} from "@mui/material";
import TablePaginationActions from "./table-with-paging";

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

export function TableListCar({
    listCar,
    handleEditClick,
    handleRemoveClick,
}: ITableListCarProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listCar.length) : 0;

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
        <Box m={2}>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                "th": {
                                    backgroundColor: "rgb(141 147 225 / 87%)",
                                },
                            }}
                        >
                            <TableCell align="center" colSpan={1}>
                                Tên
                            </TableCell>
                            <TableCell align="center">Kiểu xe</TableCell>
                            <TableCell align="center">Số ghế</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? listCar.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : listCar
                        ).map((car: ICarDetail, index) => (
                            <TableRow key={index}>
                                <TableCell align="left" scope="row">
                                    {car.name}
                                </TableCell>
                                <TableCell align="left">
                                    {car.type_car}
                                </TableCell>
                                <TableCell align="left">
                                    {car.capacity}
                                </TableCell>
                                <TableCell align="left">{car.status}</TableCell>
                                <TableCell align="center">
                                    <Tooltip
                                        title="Sửa"
                                        arrow
                                        placement="left-start"
                                    >
                                        <IconButton
                                            aria-label="Edit"
                                            onClick={() => handleEditClick(car)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        title="Xoá"
                                        arrow
                                        placement="right-end"
                                    >
                                        <IconButton
                                            aria-label="Delete"
                                            onClick={() =>
                                                handleRemoveClick(car)
                                            }
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </Tooltip>
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
                                colSpan={5}
                                count={listCar.length}
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
        </Box>
    );
}
