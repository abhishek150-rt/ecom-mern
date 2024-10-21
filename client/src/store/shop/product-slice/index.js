import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: {},
    
};

export const fetchAllProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async ({ filtersParams, sortParams }, { rejectWithValue }) => {
        const searchQuery = new URLSearchParams({ ...filtersParams, sortBy: sortParams });
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shop/products/get-all-product?${searchQuery}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);

export const fetchProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shop/products/get-product-details/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);

const ShopProductSlice = createSlice({
    name: "shopProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default ShopProductSlice.reducer;
