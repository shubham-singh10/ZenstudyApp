import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { REACT_APP_API, REACT_APP_API2 } from '@env';

// Async thunk for initiating the payment order
export const initiatePayment = createAsyncThunk(
    'payment/initiatePayment',
    async ({ amount, userId, courseId }, thunkAPI) => {
        //console.log('Amount: ', amount, userId, courseId);
        try {
            const response = await axios.post(`${REACT_APP_API2}zenstudy/api/payment/order`, {
                amount,
                user_id: userId,
                course_id: courseId,
            });
            // //console.log('Res: ', response.data)
            return response.data;
        } catch (error) {
            // //console.log('Error: ', error.message);
            const errorMessage = error.response?.data?.message || 'Failed to create payment order';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for verifying the payment
export const verifyPayment = createAsyncThunk(
    'payment/verifyPayment',
    async ({ razorpayData, userId, courseId, price, subtotal, code, discount }, thunkAPI) => {
        //console.log('RezorPayData: ', razorpayData);
        //console.log('UserId: ', userId);
        //console.log('CourseId: ', courseId);
        //console.log('Price: ', price);
        //console.log('Subtotal: ', subtotal);
        //console.log('Code: ', code);
        //console.log('Discount: ', discount);
        
        try {
            const response = await axios.post(`${REACT_APP_API2}zenstudy/api/payment/verify`, {
                razorpay_order_id: razorpayData.razorpay_order_id,
                razorpay_payment_id: razorpayData.razorpay_payment_id,
                razorpay_signature: razorpayData.razorpay_signature,
                user_id: userId,
                course_id: courseId,
                coursePrice: price,
                purchasePrice: subtotal,
                couponCode: code,
                couponApplied: code ? true : false,
                discount: discount,
                coursevalidation: "2025-03-01",
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to verify payment';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
// Async thunk for initiating the payment order
export const applyCoupon = createAsyncThunk(
    'payment/applyCoupon',
    async ({ code, price, courseId }, thunkAPI) => {
        //console.log('Code: ', code, price, courseId);
        try {
            const response = await axios.post(`${REACT_APP_API}zenstudy/api/coupon/applyCoupon`, {
                code,
                coursePrice: price,
                courseId,
            });
             //console.log('Res: ', response.data);
            return response.data;
        } catch (error) {
            //console.log('Error: ', error.response?.data?.message);
            const errorMessage = error.response?.data?.message || 'Failed to apply coupon';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        loading: false,
        error: null,
        orderData: null,
        verifyData: null,
        discountPrice: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle initiate payment order
        builder.addCase(initiatePayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(initiatePayment.fulfilled, (state, action) => {
            state.loading = false;
            state.orderData = action.payload;
        });
        builder.addCase(initiatePayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle initiate apply coupon
        builder.addCase(applyCoupon.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(applyCoupon.fulfilled, (state, action) => {
            state.loading = false;
            state.discountPrice = action.payload;
        });
        builder.addCase(applyCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle verify payment
        builder.addCase(verifyPayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(verifyPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.verifyData = action.payload;
        });
        builder.addCase(verifyPayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default paymentSlice.reducer;
