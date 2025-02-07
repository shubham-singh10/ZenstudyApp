import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API} from '@env';

// Thunk to fetch Profile data
export const fetchProfileDetails = createAsyncThunk(
  'profile/fetchDetails',
  async (userId, {rejectWithValue}) => {
    //console.log('userId', userId);
    try {
      const response = await axios.get(
        `${REACT_APP_API}zenstudy/api/app/userdetail/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const {userdetail} = response.data;

      // Construct the imageUrl conditionally
      const imageUrl = userdetail.avatar.startsWith('http')
        ? userdetail.avatar
        : `${REACT_APP_API}zenstudy/api/image/getimage/${userdetail.avatar}`;

      const updatedUserDetail = {
        ...userdetail,
        imageUrl,
      };
      return updatedUserDetail;
    } catch (error) {
      // Default error message
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response) {
        // Server-side error
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // No response from server
        errorMessage =
          'No response from server. Please check your internet connection.';
      } else {
        // Request setup error
        errorMessage = error.message;
      }

      console.error('Error fetching profile data:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// Thunk to update Profile data
export const updateProfileDetails = createAsyncThunk(
  'profile/updateDetails',
  async ({userId, userUpdate}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `${REACT_APP_API}zenstudy/api/app/updateUserN/${userId}`,
        userUpdate,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const data = response.data;
      return data.message;
    } catch (error) {
      // Default error message
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response) {
        // Server-side error
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // No response from server
        errorMessage =
          'No response from server. Please check your internet connection.';
      } else {
        // Request setup error
        errorMessage = error.message;
      }

      console.error('Error update profile data:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// Initial state
const initialState = {
  profileData: null,
  successMessage: null,
  error: null,
  loading: false,
};

// Profile details slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfileDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add cases for updateProfileDetails
      .addCase(updateProfileDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Store success message or any confirmation needed
      })
      .addCase(updateProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError} = profileSlice.actions;
export default profileSlice.reducer;
