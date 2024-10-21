import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    addressList: []

}

export const fetchAllAddress = createAsyncThunk(
    "/address/fetchAllAddress",
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shop/address/getAll/${userId}`, {
                withCredentials: true
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const addAddress = createAsyncThunk(
    "/address/addAddress",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/shop/address/add`, payload, {
                withCredentials: true
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const editAddress = createAsyncThunk(
    "/address/editAdress",
    async (payload, { rejectWithValue }) => {
        const userId = payload.userId;
        const addressId = payload.addressId;
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/shop/address/edit/${userId}/${addressId}`, payload, {
                withCredentials: true
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

export const deleteAddress = createAsyncThunk(
    "/address/deleteAddress",
    async (payload, { rejectWithValue }) => {
        try {
            const userId = payload.userId;
            const addressId = payload.addressId;
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/shop/address/delete/${userId}/${addressId}`, {
                withCredentials: true
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong")
        }
    }
)

const AddressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAddress.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.userAddresses
            })
            .addCase(fetchAllAddress.rejected, state => {
                state.isLoading = false;
                state.addressList = []
            })
            .addCase(addAddress.pending, state => {
                state.isLoading = true
            }).addCase(addAddress.fulfilled, (state) => {
                state.isLoading = false;
            }).addCase(addAddress.rejected, state => {
                state.isLoading = false;
                state.addressList = []
            })
            .addCase(editAddress.pending, state => {
                state.isLoading = true
            }).addCase(editAddress.fulfilled, (state) => {
                state.isLoading = false;
            }).addCase(editAddress.rejected, state => {
                state.isLoading = false;
                state.addressList = []
            })
            .addCase(deleteAddress.pending, state => {
                state.isLoading = true
            }).addCase(deleteAddress.fulfilled, (state) => {
                state.isLoading = false;
            }).addCase(deleteAddress.rejected, state => {
                state.isLoading = false;
                state.addressList = []
            })
    }
})

export default AddressSlice.reducer