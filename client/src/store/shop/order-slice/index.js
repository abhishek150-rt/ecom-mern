import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  approvalUrl: null,
  orderId: null,
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "order/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/shop/order/create`,
        payload,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/shop/order/capture`,
        payload,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getOrdersList = createAsyncThunk(
  "order/getOrders",
  async ({userId}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/shop/order/getAll/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  "order/getOrderDetail",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/shop/order/details/${orderId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const ShopOrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem("orderId", action.payload.orderId);
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalUrl = null;
        state.orderId = null;
      })
      .addCase(getOrdersList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.orders;
      })
      .addCase(getOrdersList.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.order;
      })
      .addCase(getOrderDetail.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default ShopOrderSlice.reducer;
