// index.js in your slice folder
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API } from '@env';
// Thunk to fetch login data
export const DetailsCourseData = createAsyncThunk(
    'couredetails',
    async (courseId, thunkAPI) => {
        try {
            const response = await axios.get(
                `${REACT_APP_API}zenstudy/api/course/coursedetail/${courseId}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            //  console.log('Response: ', response.data);

            return response.data.coursedetail;
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
const appDetailscourseSlice = createSlice({
    name: 'couredetails',
    initialState: {
        courseData: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DetailsCourseData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DetailsCourseData.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData = action.payload;
            })
            .addCase(DetailsCourseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default appDetailscourseSlice.reducer;