import { SEND_OTP, RESEND_OTP, VERIFY_OTP, OTP_ERROR, OTP_SUCCESS, reset_SUCCESS } from '../types/otpTypes';

const initialState = {
    otpSent: false,
    otpValid: false,
    resetValid: false,
    error: null,
    loading: false,
};

const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case OTP_SUCCESS:
            return { ...state, loading: true, otpSent: true };
        case OTP_ERROR:
            return { ...state, loading: false, error: action.payload };
        case SEND_OTP:
            return { ...state, otpSent: true, loading: false };
        case RESEND_OTP:
            return { ...state, otpSent: true, loading: false };
        case VERIFY_OTP:
            return { ...state, otpValid: true, loading: false };
        case reset_SUCCESS:
            return { ...state, resetValid: true, loading: false };
        default:
            return state;
    }
};

export default otpReducer;
