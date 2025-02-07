import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API2 } from '@env';


// Thunk to fetch watch data
export const PurchaseWatchCourseData = createAsyncThunk(
    'PurchaseWatchCourseData',
    async (courseId, thunkAPI) => {
        console.log(courseId);
        try {
            const response = await axios.post(
                `${REACT_APP_API2}zenstudy/api/app/watchCourse`,
                { id: courseId },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.data;

            if (data.message === 'Done') {
                return data.response.modules;
            }

        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.'; // Default error message

            if (error.response) {
                // Server-side error
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                // No response from server
                errorMessage = 'No response from server. Please check your internet connection.';
            } else {
                // Request setup error
                errorMessage = error.message;
            }

            console.error('Error fetching course data: ', errorMessage);
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Define initial state
const initialState = {
    courseData: null,
    error: null,
    loading: false,
};

// Create slice for purchase course details
const appDetailsCourseSlice = createSlice({
    name: 'PurchaseWatchCourseData',
    initialState,
    reducers: {
        // Additional reducers like clearing error can be added if needed
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(PurchaseWatchCourseData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PurchaseWatchCourseData.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData = action.payload;
            })
            .addCase(PurchaseWatchCourseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = appDetailsCourseSlice.actions;
export default appDetailsCourseSlice.reducer;
