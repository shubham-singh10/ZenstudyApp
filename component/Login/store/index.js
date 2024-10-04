// index.js in your slice folder
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API } from '@env';
// Thunk to fetch login data
export const loginData = createAsyncThunk(
    'authentication/login',
    async ({ phone, password }, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/auth/signin`,
                { phone, password },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            // console.log('Response: ', response.data);
            return response.data;
        } catch (error) {
            let errorMessage;

            // Check if the error has a response from the server
            if (error.response) {
                // Server responded with a status other than 2xx
                errorMessage = error.response.data.message || 'An error occurred. Please try again.'; // Adjust this based on your API's response structure
            } else if (error.request) {
                // Request was made but no response was received
                errorMessage = 'No response from server. Please check your internet connection.';
            } else {
                // Something happened in setting up the request that triggered an error
                errorMessage = error.message;
            }

            console.log('Error: ', errorMessage);
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
