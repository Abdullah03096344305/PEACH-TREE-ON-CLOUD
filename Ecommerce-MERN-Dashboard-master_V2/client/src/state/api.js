//import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
////import getTransactions from "E:/CC/Ecommerce-MERN-Dashboard-master/Ecommerce-MERN-Dashboard-master/server/controllers/client.js";
//export const api = createApi({
//  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
//  reducerPath: "adminApi",
//  tagTypes: [
//    "User",
//    "Products",
//    "Customers",
//    "Transactions",
//    "Geography",
//    "Sales",
//    "Admins",
//    "Performance",
//    "Dashboard",
//  ],
//  endpoints: (build) => ({
//    // Get user by ID
//    getUser: build.query({
//      query: (id) => `http://localhost:3000/general/user/${id}`,
//      providesTags: ["User"],
//    }),

//    // Get all products
//    getProducts: build.query({
//      query: () => ({
//        url: "http://localhost:3000/client/products?",
//        method: "GET",
//      }),
//      providesTags: ["Products"],
//    }),

//    // Get all customers
//    //getCustomers: build.query({
//    //    query: () => "client/customers",
//    //    providesTags: ["Customers"],
//    //}),
//    getCustomers: build.query({
//      query: () => ({
//        url: "http://localhost:3000/client/customers",
//        method: "GET",
//      }),
//      providesTags: ["Customers"],
//    }),
//    //getTransactions
//    // Get transactions with pagination, sorting, and search
//    getTransactions: build.query({
//      query: ({ page, pageSize, sort, search }) => ({
//        url: "http://localhost:3000/client/transactions",
//        method: "GET",
//        params: {
//          page,
//          pageSize,
//          sort: sort ? JSON.stringify(sort) : undefined, // Convert to JSON string
//          search,
//        },
//      }),
//      transformResponse: (response) => ({
//        transactions: response.transactions.map((transaction) => ({
//          _id: transaction._id,
//          userId: transaction.userId,
//          cost: parseFloat(transaction.cost), // Ensure cost is a number
//          products: transaction.products || [], // Ensure products is always an array
//          createdAt: new Date(transaction.createdAt).toISOString(), // Ensure ISO format
//          updatedAt: new Date(transaction.updatedAt).toISOString(),
//        })),
//        total: response.total, // Total count of transactions
//      }),
//      providesTags: ["Transactions"],
//    }),

//    // Get geography data
//    getGeography: build.query({
//      query: () => ({
//        url: "http://localhost:3000/client/geography?",
//        method: "GET",
//      }),
//      providesTags: ["Geography"],
//    }),

//    // Get sales data
//    getSales: build.query({
//      query: () => ({
//        url: "http://localhost:3000/sales/sales?",
//        method: "GET",
//      }),
//      providesTags: ["Sales"],
//    }),

//    // Get all admins
//    getAdmins: build.query({
//      query: () => ({
//        url: "http://localhost:3000/management/admins?",
//        method: "GET",
//      }),
//      providesTags: ["Admins"],
//    }),

//    // Get user performance by ID
//    getUserPerformance: build.query({
//      query: (id) => `http://localhost:3000/management/performance/${id}`,
//      providesTags: ["Performance"],
//    }),

//    // Get dashboard data
//    getDashboard: build.query({
//      //query: () => "general/dashboard",
//      query: () => ({
//        url: "http://localhost:3000/general/dashboard?",
//        method: "GET",
//      }),
//      providesTags: ["Dashboard"],
//    }),

//    // Add a new product
//    addProduct: build.mutation({
//      query: (newProduct) => ({
//        url: "http://localhost:3000/client/products",
//        method: "POST",
//        body: newProduct,
//      }),
//      invalidatesTags: ["Products"],
//    }),

//    // Update an existing product
//    updateProduct: build.mutation({
//      query: ({ id, ...updatedProduct }) => ({
//        url: `http://localhost:3000/client/products/${id}`,
//        method: "PUT",
//        body: updatedProduct,
//      }),
//      invalidatesTags: ["Products"],
//    }),

//    // Delete a product by ID
//    deleteProduct: build.mutation({
//      query: (id) => ({
//        url: `http://localhost:3000/client/products/${id}`,
//        method: "DELETE",
//      }),
//      invalidatesTags: ["Products"],
//    }),
//  }),
//});

//// Export hooks for usage in components
//export const {
//    useGetUserQuery,
//    useGetProductsQuery,
//    useGetCustomersQuery,
//    useGetTransactionsQuery,
//    useGetGeographyQuery,
//    useGetSalesQuery,
//    useGetAdminsQuery,
//    useGetUserPerformanceQuery,
//    useGetDashboardQuery,
//    useAddProductMutation,
//    useUpdateProductMutation,
//    useDeleteProductMutation,
//} = api;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Products",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard",
    ],
    endpoints: (build) => ({
        /* ALL EXISTING ENDPOINTS REMAIN UNCHANGED */
        getUser: build.query({
            query: (id) => `http://localhost:3000/general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => ({
                url: "http://localhost:3000/client/products?",
                method: "GET",
            }),
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => ({
                url: "http://localhost:3000/client/customers",
                method: "GET",
            }),
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "http://localhost:3000/client/transactions",
                method: "GET",
                params: {
                    page,
                    pageSize,
                    sort: sort ? JSON.stringify(sort) : undefined,
                    search,
                },
            }),
            transformResponse: (response) => ({
                transactions: response.transactions.map((transaction) => ({
                    _id: transaction._id,
                    userId: transaction.userId,
                    cost: parseFloat(transaction.cost),
                    products: transaction.products || [],
                    createdAt: new Date(transaction.createdAt).toISOString(),
                    updatedAt: new Date(transaction.updatedAt).toISOString(),
                })),
                total: response.total,
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => ({
                url: "http://localhost:3000/client/geography?",
                method: "GET",
            }),
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => ({
                url: "http://localhost:3000/sales/sales?",
                method: "GET",
            }),
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => ({
                url: "http://localhost:3000/management/admins?",
                method: "GET",
            }),
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `http://localhost:3000/management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => ({
                url: "http://localhost:3000/general/dashboard?",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
        addProduct: build.mutation({
            query: (newProduct) => ({
                url: "http://localhost:3000/client/products",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: build.mutation({
            query: ({ id, ...updatedProduct }) => ({
                url: `http://localhost:3000/client/products/${id}`,
                method: "PUT",
                body: updatedProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `http://localhost:3000/client/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),

        /* NEW ADDITION ONLY - Add Transaction Mutation */
        addTransaction: build.mutation({
            query: (transactionData) => ({
                url: "http://localhost:3000/client/transactions",
                method: "POST",
                body: transactionData,
            }),
            invalidatesTags: ["Transactions"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    /* NEW EXPORT ONLY */
    useAddTransactionMutation,
} = api;