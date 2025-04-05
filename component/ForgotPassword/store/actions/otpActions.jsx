import { SEND_OTP, RESEND_OTP, VERIFY_OTP, OTP_ERROR, OTP_SUCCESS, reset_SUCCESS } from '../types/otpTypes';
import axios from 'axios';
import { REACT_APP_API2 } from '@env';
// Action to send OTP to the user's email
export const sendOtp = (email) => async (dispatch) => {
    try {
        dispatch({ type: OTP_SUCCESS, payload: { email } });
        // Simulate API call
        const response = await axios.post(`${REACT_APP_API2}zenstudy/api/app/send-otp`, { email });
        if (response.status === 200) {
            dispatch({
                type: SEND_OTP,
                payload: { otpSent: true },
            });
            return response.data;
        }

        throw new Error('Failed to send OTP');
    } catch (error) {
        console.log('Error in sendOtp:', error.response.data.message);
        if (error.response) {
            dispatch({ type: OTP_ERROR, payload: error.response.data.message || 'Something went wrong' });
            return error.response.data || 'Something went wrong';
        } else if (error.request) {
            dispatch({ type: OTP_ERROR, payload: 'No response from server' });
            return { message: 'No response from server' };
        } else {
            dispatch({ type: OTP_ERROR, payload: error.message });
            return { message: error.message };
        }
    }
};

// Action to resend OTP
export const resendOtp = (email) => async (dispatch) => {
    try {
        dispatch({ type: OTP_SUCCESS, payload: { email } });
        // Simulate API call
        const response = await axios.post(`${REACT_APP_API2}zenstudy/api/app/resend-otp`, { email });
        if (response.status === 200) {
            dispatch({
                type: RESEND_OTP,
                payload: { otpSent: true },
            });
            return response.data;
        }
        throw new Error('Failed to send OTP');
    } catch (error) {
        if (error.response) {
            dispatch({ type: OTP_ERROR, payload: error.response.data.message || 'Something went wrong' });
            return error.response.data || 'Something went wrong';
        } else if (error.request) {
            dispatch({ type: OTP_ERROR, payload: 'No response from server' });
            return { message: 'No response from server' };
        } else {
            dispatch({ type: OTP_ERROR, payload: error.message });
            return { message: error.message };
        }
    }
};

// Action to verify OTP
export const verifyOtp = (otp, email) => async (dispatch) => {
    try {
        // Simulate API call
        dispatch({ type: OTP_SUCCESS, payload: { email } });
        const response = await axios.post(`${REACT_APP_API2}zenstudy/api/app/verify-otp`, { enteredOtp: otp, email });
        if (response.status === 200) {
            dispatch({
                type: VERIFY_OTP,
                payload: { otpValid: true },
            });
            return response.data;
        }
        throw new Error('Failed to verify OTP');
    } catch (error) {
        if (error.response) {
            dispatch({ type: OTP_ERROR, payload: error.response.data.message || 'Something went wrong' });
            return error.response.data || 'Something went wrong';
        } else if (error.request) {
            dispatch({ type: OTP_ERROR, payload: 'No response from server' });
            return { message: 'No response from server' };
        } else {
            dispatch({ type: OTP_ERROR, payload: error.message });
            return { message: error.message };
        }
    }
};

export const resetpassword = (email, password) => async (dispatch) => {
    try {
        // Simulate API call
        dispatch({ type: OTP_SUCCESS, payload: { email } });
        const response = await axios.post(`${REACT_APP_API2}zenstudy/api/app/reset-password`, { email, newPassword: password });
        if (response.status === 200) {
            dispatch({
                type: reset_SUCCESS,
                payload: { resetValid: true },
            });
            return response.data;
        }
        throw new Error('Failed to verify OTP');
    } catch (error) {
        if (error.response) {
            dispatch({ type: OTP_ERROR, payload: error.response.data.message || 'Something went wrong' });
            return error.response.data || 'Something went wrong';
        } else if (error.request) {
            dispatch({ type: OTP_ERROR, payload: 'No response from server' });
            return { message: 'No response from server' };
        } else {
            dispatch({ type: OTP_ERROR, payload: error.message });
            return { message: error.message };
        }
    }
};
