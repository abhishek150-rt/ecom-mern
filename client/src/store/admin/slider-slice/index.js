import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  slideList: [],
  statusUpdated: false,
};

export const getAllSlides = createAsyncThunk(
  "admin/getAllSlides", // Changed to start with "admin" for consistency
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admin/slider/getAll`,
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

export const addSlide = createAsyncThunk(
  "admin/addSlide", // Changed to start with "admin" for consistency
  async ({ image }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/admin/slider/upload`,
        { image },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to add slider image"
      );
    }
  }
);

const SliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSlides.pending, (state) => {
        state.slideList = []; // Optionally you can set a loading state here
      })
      .addCase(getAllSlides.fulfilled, (state, action) => {
        state.slideList = action.payload.data;
      })
      .addCase(getAllSlides.rejected, (state) => {
        state.slideList = []; // Optionally handle error state
      })
      .addCase(addSlide.pending, (state) => {
        state.statusUpdated = false; // Correctly set to false on pending
      })
      .addCase(addSlide.fulfilled, (state) => {
        state.statusUpdated = true; // Set to true on successful update
      })
      .addCase(addSlide.rejected, (state) => {
        state.statusUpdated = false; // Set back to false on failure
      });
  },
});

export default SliderSlice.reducer;
