import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false, // Set to false initially
    productList: [],
};

// Async thunk for adding a new product
export const addNewProduct = createAsyncThunk(
    "product/addNewProduct", // Action type
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/products/add-product`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);

// Async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
    "product/fetchAllProducts", // Action type
    async (_, { rejectWithValue }) => { // No need for formData

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/products/get-all-product`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);

// Async thunk for editing a product
export const editProduct = createAsyncThunk(
    "product/editProduct", // Action type
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/admin/products/edit-product/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct", // Action type
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/products/delete-product/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);

const AdminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {}, // Add any synchronous reducers here if needed
    extraReducers: (builder) => {
        builder
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true; // Set loading state
            })
            .addCase(addNewProduct.fulfilled, (state) => {
                state.isLoading = false; // Reset loading state
            })
            .addCase(addNewProduct.rejected, (state) => {
                state.isLoading = false; // Reset loading state on error
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true; // Set loading state
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false; // Reset loading state
                state.productList = action.payload.data; // Update product list
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false; // Reset loading state on error
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true; // Set loading state
            })
            .addCase(editProduct.fulfilled, (state) => {
                state.isLoading = false; // Reset loading state
            })
            .addCase(editProduct.rejected, (state) => {
                state.isLoading = false; // Reset loading state on error
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true; // Set loading state
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false; // Reset loading state
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.isLoading = false; // Reset loading state on error
            });
    },
});

export default AdminProductSlice.reducer; // Export the reducer
