import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API2 } from '@env';

// Thunk to fetch Meeting data
export const fetchMeetingDetails = createAsyncThunk(
    'meeting/fetchMeetingDetails',
    async (thunkAPI) => {
        try {
            const response = await axios.get(
                `${REACT_APP_API2}zenstudy/api/app/getMeeting`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = response.data;
            const imageData = data?.map(meeting => ({
                ...meeting,
                imageUrl: `${process.env.REACT_APP_API}zenstudy/api/image/getimage/${meeting.courseId.thumbnail}`,
            }));
            console.log('Meeting data:', imageData);
            return imageData;

        } catch (error) {
            // Default error message
            let errorMessage = 'An error occurred. Please try again.';
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

            console.error('Error fetching meeting data:', errorMessage);
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


// Initial state
const initialState = {
    meetingData: null,
    error: null,
    loading: false,
};

// Profile details slice
const profileSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeetingDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeetingDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.meetingData = action.payload;
            })
            .addCase(fetchMeetingDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;
