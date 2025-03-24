import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API, REACT_APP_API2 } from '@env';

// Thunk to register/signup user
export const signupUser = createAsyncThunk(
    'authentication/signupUser',
    async ({ phone, name, email, userType, phoneStatus, password }, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/auth/signUp`,
                { phone, password, name, email, userType, phoneStatus },
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
export const handleUserFlow = createAsyncThunk(
    'authentication/handleUserFlow',
    async ({ email }, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/auth/user-check`,
                { data: email },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const resdata = response.data;
            if (resdata.message === 'Success') {
                return { step: 'login' };
            }
        } catch (error) {
            if (error.response?.status === 404) {
                await thunkAPI.dispatch(sendOtp(email));
                return { step: 'otp' };
            } else if (error.response?.status === 403) {
                return { step: 'setPassword' };
            } else {
                return thunkAPI.rejectWithValue('Something went wrong. Please try again later.');
            }
        }
    }
);


// 2. Send OTP
export const sendOtp = createAsyncThunk(
    'authentication/sendOtp',
    async (email, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/email/send-otpNew`,
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
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/auth/signUpDynamicVerify`,
                { email, otp, userType: 'Reader' },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Invalid OTP. Please try again.');
        }
    }
);


// 4. Register User
export const registerUser = createAsyncThunk('authentication/registerUser', async ({ email }, thunkAPI) => {
    try {
        const response = await axios.post(`${REACT_APP_API}zenstudy/api/auth/signUpDynamic`, { email, userType: 'Reader' }, { withCredentials: true });
        const user = response.data.user;
        AsyncStorage.setItem('userData', JSON.stringify(user));
        return user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed.');
    }
});

// Slice for authentication
const appUsersSlice = createSlice({
    name: 'authentication',
    initialState: {
        userData: null,
        loading: false,
        error: null,
        otpSent: false,
        otpVerified: false,
        step: 'checkUser',
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
            .addCase(handleUserFlow.pending, (state) => { state.loading = true; })
            .addCase(handleUserFlow.fulfilled, (state, action) => { state.loading = false; state.step = action.payload.step; })
            .addCase(handleUserFlow.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

             // Send OTP
             .addCase(sendOtp.pending, (state) => { state.loading = true; })
             .addCase(sendOtp.fulfilled, (state) => { state.loading = false; state.otpSent = true; })
             .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

             // Verify OTP
            .addCase(verifyOtp.pending, (state) => { state.loading = true; })
            .addCase(verifyOtp.fulfilled, (state) => { state.loading = false; state.otpVerified = true; })
            .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Register User
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.userData = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

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
