import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { UserData } from '../userData/UserData';
import { useDispatch } from 'react-redux';
import { sendOTP, verifyOTP } from './store';
import Toast from 'react-native-toast-message';

const PurchaseModal = ({ isVisible, onClose, setIsModalVisible1 }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOkClick = () => {
        onClose();
        setIsModalVisible(true);
        // navigation.navigate('profileScreen');
    };

    return (
        <View style={styles.container}>
            <Modal
                isVisible={isVisible}
                onBackdropPress={onClose}
                onBackButtonPress={onClose}
                style={styles.modal}
            >
                <View style={styles.modalContainer}>

                    <Text style={styles.modalTitle}>Please Verify Your Email</Text>
                    <Text style={styles.modalMessage}>
                        You need to verify your email before making a purchase. Please follow the instructions to verify your email address.
                    </Text>

                    <TouchableOpacity style={styles.okButton} onPress={handleOkClick}>
                        <Text style={styles.okButtonText}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <EmailVerificationModal
                isModalVisible={isModalVisible}
                setIsModalVisible1={setIsModalVisible1}
                setIsModalVisible={setIsModalVisible}
            />
        </View>
    );
};

const EmailVerificationModal = ({ isModalVisible, setIsModalVisible, setIsModalVisible1 }) => {
    const { usersData, refreshUserData } = UserData();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpVisible, setIsOtpVisible] = useState(false);
    const [errorType, setErrorType] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifyLoading, setIsVerifyLoading] = useState(false);
    const dispatch = useDispatch();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    useEffect(() => {
        if (isModalVisible && usersData) {
            setEmail(usersData.email || '');
            setIsDataLoaded(true);
        }
    }, [isModalVisible, usersData]);

    const handleVerifyEmail = async () => {
        if (!email || !emailPattern.test(email)) {
            setErrorType('email');
            return;
        }

        try {
            setIsLoading(true);
            const response = await dispatch(
                sendOTP({
                    userId: usersData._id,
                    email: email,
                })
            ).unwrap();

            if (response.message === 'OTP sent successfully') {
                setIsOtpVisible(true);
                setErrorType('');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error || 'Failed to send OTP. Please try again.',
                visibilityTime: 5000,
                position: 'top',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            setErrorType('otp');
            return;
        }

        try {
            setIsVerifyLoading(true);
            const response = await dispatch(
                verifyOTP({
                    userId: usersData._id,
                    email: email,
                    code: otp,
                })
            ).unwrap();
            if (response.message === 'OTP verified successfully') {
                setIsModalVisible(false);
                setOtp('');
                setIsModalVisible1(true);
                await refreshUserData();
                // navigation.navigate('profileScreen');
            }
        } catch (error) {
            setErrorType('otp');
            Toast.show({
                type: 'error',
                text1: 'Verification Error',
                text2: error || 'Failed to verify OTP. Please try again.',
                visibilityTime: 5000,
                position: 'top',
            });
        } finally {
            setIsVerifyLoading(false);
        }
    };

    const handleCrossEmail = () => {
        setEmail('');
        setOtp('');
        setIsOtpVisible(false);
        setErrorType('');
    };

    const getErrorMessage = () => {
        if (errorType === 'email') {
            return 'Please enter a valid email.';
        }
        if (errorType === 'otp') {
            return 'Please enter a valid OTP.';
        }
        return '';
    };

    if (!isDataLoaded) {
        return null;
    }

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            onBackButtonPress={() => setIsModalVisible(false)}
            style={styles.modal}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Verify Your Email</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    editable={!isOtpVisible}
                />

                {getErrorMessage() && <Text style={styles.errorText}>{getErrorMessage()}</Text>}

                {isOtpVisible ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            placeholderTextColor="#888"
                            value={otp}
                            onChangeText={setOtp}
                        />
                        {isVerifyLoading ? (
                            <View style={styles.verifyButtonL}>
                                <Text style={styles.verifyButtonText} numberOfLines={1} ellipsizeMode="tail">Please wait....</Text>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
                                <Text style={styles.verifyButtonText}>Verify OTP</Text>
                            </TouchableOpacity>
                        )}
                    </>
                ) : (
                    isLoading ? (
                        <View style={styles.verifyButtonL}>
                            <Text style={styles.verifyButtonText} numberOfLines={1} ellipsizeMode="tail">Please wait....</Text>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyEmail}>
                            <Text style={styles.verifyButtonText}>Verify Email</Text>
                        </TouchableOpacity>)
                )}

                {isOtpVisible && (
                    <TouchableOpacity style={styles.crossButton} onPress={handleCrossEmail}>
                        <Text style={styles.crossButtonText}>✖ Cancel</Text>
                    </TouchableOpacity>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 0,
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 20,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    icon: {
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 22,
    },
    okButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    okButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: 12,
        color: '#000',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        borderColor: '#ccc',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 14,
        marginBottom: 15,
    },
    verifyButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    verifyButtonL: {
        backgroundColor: '#ff0000',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    crossButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    crossButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PurchaseModal;
