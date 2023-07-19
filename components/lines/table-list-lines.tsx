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
} from "@mui/material";
import TablePaginationActions from "./table-with-paging";

import { ILineDetail } from "@/models";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
// import { Identifier } from "typescript";
export interface ITableListLineProps {
    listLine: [ILineDetail];
    // eslint-disable-next-line no-unused-vars
    handleEditClick: (data: ILineDetail) => void;
    // eslint-disable-next-line no-unused-vars
    handleRemoveClick: (data: ILineDetail) => void;
}

export function TableListLine({
    listLine,
    handleEditClick,
    handleRemoveClick,
}: ITableListLineProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listLine.length) : 0;

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
        <Box>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Tuyến đường</TableCell>
                            <TableCell align="left">Điểm khởi hành</TableCell>
                            <TableCell align="left">Điểm cuối</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? listLine.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : listLine
                        ).map((line: ILineDetail) => (
                            <TableRow
                                key={line._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="left" scope="row">
                                    {line.departure + " - " + line.arrival}
                                </TableCell>
                                <TableCell align="left">{line.from}</TableCell>
                                <TableCell align="left">{line.to}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="Edit"
                                        onClick={() => handleEditClick(line)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={() => handleRemoveClick(line)}
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
                                colSpan={3}
                                count={listLine.length}
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
