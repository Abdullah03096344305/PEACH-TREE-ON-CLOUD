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
    // Get user by ID
    getUser: build.query({
      query: (id) => `http://localhost:3000/general/user/${id}`,
      providesTags: ["User"],
    }),

    // Add user
    addUser: build.mutation({
      query: (newUser) => ({
        url: "http://localhost:3000/general/user",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    // Login User (NOT RECOMMENDED - See Comments)
    loginUser: build.mutation({
      query: (credentials, { dispatch }) => {
        // Corrected: Destructure dispatch from the context
        // **IMPORTANT SECURITY WARNING:**
        // This is extremely insecure.  You should NEVER send a user's password
        // to the client like this in a real application.  Passwords should only
        // be compared on the server after being hashed.  This code is for
        // demonstration purposes ONLY and should NOT be used in production.

        return {
          url: `http://localhost:3000/general/user?email=${credentials.email}`, // Try to fetch user by email.
          method: "GET", // changed to GET
        };
      },
      transformResponse: (response, meta, arg) => {
        // console.log("response", response);
        // console.log("arg", arg);
        if (!response || response.length === 0) {
          throw new Error("User not found"); // Or some other error
        }
        // Assuming the API returns an array of users, we take the first one.
        const user = response[0];

        if (user.password !== arg.password) {
          //  compare plain text passwords
          throw new Error("Invalid password");
        }
        return user; // return the user.
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // console.log("result", result);
          // `dispatch` is available to dispatch actions as needed
          // dispatch(login(result.data));
          // localStorage.setItem('user', JSON.stringify(result.data));
        } catch (error) {
          // `error` is the error returned from `queryFulfilled`
          console.error("Login failed", error);
          // Handle error, show message
        }
      },
    }),

    // Get all products
    getProducts: build.query({
      query: () => ({
        url: "http://localhost:3000/client/products?",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // Add a new product
    addProduct: build.mutation({
      query: (newProduct) => ({
        url: "http://localhost:3000/client/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update a product
    updateProduct: build.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `http://localhost:3000/client/products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // Delete a product
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `http://localhost:3000/client/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // Get all customers
    getCustomers: build.query({
      query: () => ({
        url: "http://localhost:3000/client/customers",
        method: "GET",
      }),
      providesTags: ["Customers"],
    }),

    // Get transactions with filters
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

    // Add a transaction
    addTransaction: build.mutation({
      query: (transactionData) => ({
        url: "http://localhost:3000/client/transactions",
        method: "POST",
        body: transactionData,
      }),
      invalidatesTags: ["Transactions"],
    }),

    // Get geography data
    getGeography: build.query({
      query: () => ({
        url: "http://localhost:3000/client/geography?",
        method: "GET",
      }),
      providesTags: ["Geography"],
    }),

    // Get sales data
    getSales: build.query({
      query: () => ({
        url: "http://localhost:3000/sales/sales?",
        method: "GET",
      }),
      providesTags: ["Sales"],
    }),

    // Get admins
    getAdmins: build.query({
      query: () => ({
        url: "http://localhost:3000/management/admins?",
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),

    // Get user performance
    getUserPerformance: build.query({
      query: (id) => `http://localhost:3000/management/performance/${id}`,
      providesTags: ["Performance"],
    }),

    // Get dashboard data
    getDashboard: build.query({
      query: () => ({
        url: "http://localhost:3000/general/dashboard?",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

// Export hooks
export const {
  useGetUserQuery,
  useAddUserMutation,
  useLoginUserMutation, // Export the new hook
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
