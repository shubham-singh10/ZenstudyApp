import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API } from '@env';

// Helper function to handle course image URL
const mapCoursesWithImages = (courses) => {
    return courses.map(purchase => ({
        ...purchase,
        imageurl: `${REACT_APP_API}zenstudy/api/image/getimage/${purchase.course_id.thumbnail}`,
    }));
};

// Thunk to fetch login data
export const PurchaseCourseData = createAsyncThunk(
    'PurchaseCourseDetails',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/payment/purchaseCourse`,
                { user_id: userId },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.data;
            if (data.message === 'Done') {

                // Filter and map courses with valid course_id
                const filteredCourses = data.purchaseCourses.filter(purchase => purchase?.course_id !== null);

                if (filteredCourses.length === 0) {
                    return thunkAPI.rejectWithValue('No purchase courses found.');
                }

                return mapCoursesWithImages(filteredCourses);
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
    name: 'PurchaseCourseDetails',
    initialState,
    reducers: {
        // Additional reducers like clearing error can be added if needed
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(PurchaseCourseData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PurchaseCourseData.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData = action.payload;
            })
            .addCase(PurchaseCourseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = appDetailsCourseSlice.actions;
export default appDetailsCourseSlice.reducer;
