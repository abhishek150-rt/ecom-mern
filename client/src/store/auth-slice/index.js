import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    loading: true,
    userInfo: null,
};

// Action type constants
const REGISTER = "/auth/register";
const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";
const AUTH = "/auth/checkAuth";

export const userRegistration = createAsyncThunk(
    REGISTER,
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, formData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Registration failed");
        }
    }
);

export const userLogin = createAsyncThunk(
    LOGIN,
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, formData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Login failed");
        }
    }
);
export const userLogout = createAsyncThunk(
    LOGOUT,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {}, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Login failed");
        }
    }
);

export const userAuth = createAsyncThunk(
    AUTH,
    async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/check-auth`, {
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"

                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Error");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegistration.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegistration.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(userRegistration.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {

                state.isAuthenticated = true
                state.userInfo = action.payload.user;
                state.loading = false;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(userAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(userAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.userInfo = action.payload.user;
                state.loading = false;
            })
            .addCase(userAuth.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(userLogout.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userLogout.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.userInfo = null
            })
    },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
