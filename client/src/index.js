import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";

// Configure the Redux store
const store = configureStore({
    reducer: {
        global: globalReducer, // Global state slice
        [api.reducerPath]: api.reducer, // API slice reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware), // Add API middleware
});

// Enable RTK Query listeners for refetching on focus/reconnect
setupListeners(store.dispatch);

// Create a root for ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);