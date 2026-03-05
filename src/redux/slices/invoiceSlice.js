import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const fetchAllInvoices = createAsyncThunk(
    "invoice/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/invoice`);
            localStorage.setItem(
                "allInvoices",
                JSON.stringify(response?.data?.data)
            );
            return response?.data?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch invoices";
            return rejectWithValue(message);
        }
    }
);

export const fetchInvoiceById = createAsyncThunk(
    "invoice/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            if (!id) {
                return rejectWithValue("Invoice ID is required for fetching");
            }
            const response = await axios.get(`${API_URL}/api/invoice/${id}`);
            localStorage.setItem(
                "invoiceById",
                JSON.stringify(response?.data?.data)
            );
            return response?.data?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch invoice";
            return rejectWithValue(message);
        }
    }
);

const getInitialInvoices = () => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("allInvoices");
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

const getInitialInvoice = () => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("invoiceById");
        return saved ? JSON.parse(saved) : null;
    }
    return null;
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        invoices: getInitialInvoices(),
        invoice: getInitialInvoice(),
        loading: true,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(fetchAllInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchInvoiceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvoiceById.fulfilled, (state, action) => {
                state.loading = false;
                state.invoice = action.payload;
            })
            .addCase(fetchInvoiceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default invoiceSlice.reducer;