import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API } from '@env';

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
            console.log('response: ', response.data);
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

            // console.log('Signup Error:', errorMessage);
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Slice for authentication
const appUsersSlice = createSlice({
    name: 'authentication',
    initialState: {
        userData: null,
        error: null,
        loading: false,
        isAuthenticated: false,
    },
    extraReducers: (builder) => {
        builder
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
