import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API } from '@env';

// Thunk to fetch purchase course data
export const PurchaseCourseData = createAsyncThunk(
    'PurchaseCourseDetails',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.post(
                `${REACT_APP_API}zenstudy/api/app/purchaseCourse`,
                { user_id: userId },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = response.data;
            if (data.message !== 'Done' || !data.purchaseCourses) {
                return thunkAPI.rejectWithValue('No purchased courses found.');
            }

            // Helper function to get image URL
            const getImageUrl = (thumbnail) =>
                `${REACT_APP_API}zenstudy/api/image/getimage/${thumbnail}`;

            // Filter valid courses
            const filteredCourses = data.purchaseCourses.filter(
                (purchase) => purchase?.course_id !== null
            );

            if (filteredCourses.length === 0) {
                return thunkAPI.rejectWithValue('No purchased courses found.');
            }

            // Separate recorded and live courses with proper image URLs
            const recordedCourses = [];
            const liveCourses = [];

            filteredCourses.forEach((purchase) => {
                const enrichedCourse = {
                    ...purchase.course,
                    paymentId: purchase.paymentId,
                    imageUrl: getImageUrl(purchase.course.thumbnail),
                };

                if (purchase.course.tags === 'notlive') {
                    recordedCourses.push(enrichedCourse);
                } else if (purchase.course.tags === 'live') {
                    liveCourses.push(enrichedCourse);
                }
            });

            // Return both recorded and live courses
            return { recordedCourses, liveCourses };
        } catch (error) {
            console.error('Error fetching purchase courses: ', error);

            let errorMessage = 'An error occurred. Please try again.';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your internet connection.';
            } else {
                errorMessage = error.message;
            }

            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


// Define initial state
const initialState = {
    recordedCourses: [],
    liveCourses: [],
    error: null,
    loading: false,
};

// Create slice for purchase course details
const appDetailsCourseSlice = createSlice({
    name: 'PurchaseCourseDetails',
    initialState,
    reducers: {
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
                state.recordedCourses = action.payload.recordedCourses;
                state.liveCourses = action.payload.liveCourses;
            })
            .addCase(PurchaseCourseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = appDetailsCourseSlice.actions;
export default appDetailsCourseSlice.reducer;
