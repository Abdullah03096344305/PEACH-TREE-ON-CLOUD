import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
    const theme = useTheme();

    // Backend query parameters
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState(null);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    // Fetch transactions
    const { data, isLoading } = useGetTransactionsQuery({
        page: page + 1, // Backend pages start from 1
        pageSize,
        sort: sort ? JSON.stringify(sort) : null, // Ensure proper JSON formatting
        search,
    });

    // Define table columns
    const columns = [
        { field: "_id", headerName: "Transaction ID", flex: 1 },
        { field: "userId", headerName: "User ID", flex: 1 },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${parseFloat(params.value).toFixed(2)}`, // Convert string to number
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (Array.isArray(params.value) ? params.value.length : 0), // Ensure correct count
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
            renderCell: (params) => new Date(params.value).toLocaleString(),
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="TRANSACTIONS" subtitle="Complete transaction list" />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data?.transactions || []}
                    columns={columns}
                    rowCount={data?.total || 0}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPaginationModelChange={(params) => setPage(params.page)}
                    onPageSizeChange={(size) => setPageSize(size)}
                    onSortModelChange={(newSortModel) => {
                        if (newSortModel.length > 0) {
                            setSort({
                                field: newSortModel[0].field,
                                sort: newSortModel[0].sort,
                            });
                        } else {
                            setSort(null);
                        }
                    }}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Transactions;
