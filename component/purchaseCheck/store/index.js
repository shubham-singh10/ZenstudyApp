import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API2 } from '@env';

const API_BASE_URL = `${REACT_APP_API2}zenstudy/api/email`;

// Thunk to send OTP
export const sendOTP = createAsyncThunk('sendOTP', async ({ userId, email }, thunkAPI) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/send-otp`,
            { userId, email },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            (error.request ? 'No response from server.' : error.message) ||
            'An error occurred.';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

// Thunk to verify OTP
export const verifyOTP = createAsyncThunk('verifyOTP', async ({ userId, email, code }, thunkAPI) => {
    // //console.log('jh: ', userId, email, code)
    try {
        const response = await axios.post(
            `${API_BASE_URL}/verify-email`,
            { userId, email, enteredOtp: code },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            (error.request ? 'No response from server.' : error.message) ||
            'An error occurred.';
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

// Initial state
const initialState = {
    data: null, // Consolidated response data
    error: null,
    loading: false,
};

// Slice definition
const appSendData = createSlice({
    name: 'appSendData',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.data = { type: 'sendOTP', payload: action.payload };
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.data = { type: 'verifyOTP', payload: action.payload };
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearData } = appSendData.actions;
export default appSendData.reducer;
