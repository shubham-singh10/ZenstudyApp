// index.js in your slice folder
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API } from '@env';
// Thunk to fetch login data
export const loginData = createAsyncThunk(
    'authentication/login',
    async ({ phone, password }, thunkAPI) => {
        //console.log(phone, password);
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/app/signin`,
                { phone, password },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            //console.log('Login Response: ', response.data);
            return response.data;
        } catch (error) {
            let errorMessage;

            // Check if the error has a response from the server
            if (error.response) {
                // Use server's error message if available
                errorMessage = error.response.data.message || 'Invalid credentials. Please try again.';
            } else if (error.request) {
                errorMessage = 'Server is not responding. Please check your internet connection.';
            } else {
                errorMessage = 'An unexpected error occurred. Please try again.';
            }

            //console.log('Login Error: ', errorMessage);
            return thunkAPI.rejectWithValue(errorMessage); // Return the specific error message
        }
    }
);


// Create slice for authentication
const appUsersSlice = createSlice({
    name: 'authentication',
    initialState: {
        userData: null,
        error: null,
        loading: false,
    },
    reducers: {
        handleLogout: (state) => {
            state.userData = null;
            state.error = null;
            AsyncStorage.removeItem('userData');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
                AsyncStorage.setItem('userData', JSON.stringify(action.payload));
            })
            .addCase(loginData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { handleLogout } = appUsersSlice.actions;
export default appUsersSlice.reducer;
