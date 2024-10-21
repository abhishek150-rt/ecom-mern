import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  statusUpdated: false,
};

export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders", // Changed to start with "admin" for consistency
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admin/order/getAll`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to fetch orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus", // Changed to start with "admin" for consistency
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/order/update/${orderId}/${status}`,{},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to update order status"
      );
    }
  }
);

const AdminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.orderList = []; // Optionally you can set a loading state here
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orderList = action.payload.orders;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.orderList = []; // Optionally handle error state
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.statusUpdated = false; // Correctly set to false on pending
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.statusUpdated = true; // Set to true on successful update
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.statusUpdated = false; // Set back to false on failure
      });
  },
});

export default AdminOrderSlice.reducer;
