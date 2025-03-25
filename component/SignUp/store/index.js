import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API, REACT_APP_API2 } from '@env';

// Thunk to register/signup user
// 4. Register User
export const signupUser = createAsyncThunk(
    'authentication/signupUser',
    async ({ phone, name, email, userType, phoneStatus,emailStatus, password }, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/app/register`,
                { phone, password, name, email, userType, phoneStatus, emailStatus },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            //console.log('response: ', response.data);
            return response.data.user;
        } catch (error) {
            let errorMessage;

            // Handle errors
            if (error.response) {
                errorMessage = error.response.data.message || 'An error occurred. Please try again.';
            } else if (error.request) {
                errorMessage = 'No response from the server. Please check your internet connection.';
            } else {
                errorMessage = error.message;
            }

            // //console.log('Signup Error:', errorMessage);
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// 1. Check if User Exists
export const checkUser = createAsyncThunk(
    'authentication/checkUser', async ({email, phone}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/app/user-check`,
                { email, phone },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to check user. Please try again.');
              }
              return thunkAPI.rejectWithValue('Failed to check user. Please try again.');
        }
    }
);

// 2. Send OTP
export const sendOtp = createAsyncThunk(
    'authentication/sendOtp',
    async (email, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API2}zenstudy/api/email/send-otpNew`,
                { email },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to send OTP. Please try again.');
        }
    }
);

// 3. Verify OTP
export const verifyOtp = createAsyncThunk(
    'authentication/verifyOtp',
    async ({ email, otp }, thunkAPI) => {
        console.log('email, otp: ', email, otp);
        try {
            const response = await axios.post(
                `${REACT_APP_API2}zenstudy/api/auth/signUpDynamicVerify`,
                { email, otp, userType: 'Reader' },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('response: ', response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Invalid OTP. Please try again.');
        }
    }
);


// Slice for authentication
const appUsersSlice = createSlice({
    name: 'authentication',
    initialState: {
        userData: null,
        loading: false,
        error: null,
        otpSent: false,
        otpVerified: false,
        isAuthenticated: false,
    },
    reducers: {
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
            state.otpSent = false;
            state.step = 'checkUser';
            state.otpVerified = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // check user
            .addCase(checkUser.pending, (state) => { state.loading = true; })
            .addCase(checkUser.fulfilled, (state, action) => { state.loading = false; })
            .addCase(checkUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

             // Send OTP
             .addCase(sendOtp.pending, (state) => { state.loading = true; })
             .addCase(sendOtp.fulfilled, (state) => { state.loading = false; state.otpSent = true; })
             .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

             // Verify OTP
            .addCase(verifyOtp.pending, (state) => { state.loading = true; })
            .addCase(verifyOtp.fulfilled, (state) => { state.loading = false; state.otpVerified = true; })
            .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Register User
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
                state.isAuthenticated = true;
                AsyncStorage.setItem('userData', JSON.stringify(action.payload)).catch((err) =>
                    console.error('Error saving AsyncStorage:', err)
                );
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default appUsersSlice.reducer;
