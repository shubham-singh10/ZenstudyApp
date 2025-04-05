import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp, resetpassword, sendOtp, verifyOtp } from './store/actions/otpActions';

export default function ForgotPassword({ navigation }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30); // 30 seconds timer
    const [canResend, setCanResend] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setShowcPassword] = useState(false);
    const [hasRequestedOtp, setHasRequestedOtp] = useState(false);

    const slideAnim = useState(new Animated.Value(0))[0];

    // Access state from Redux store
    const { loading } = useSelector(state => state.otpReducer);
    const dispatch = useDispatch();

    const animate = (direction) => {
        Animated.timing(slideAnim, {
            toValue: direction === 'right' ? 300 : -300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            slideAnim.setValue(0);
        });
    };

    const handleNext = async () => {
        if (step === 1) {
            if (!email) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please enter your email',
                });
                return;
            }
            setHasRequestedOtp(true);
            setTimer(30); // Reset timer
            setCanResend(false);

            // Simulate email verification
            const response = await dispatch(sendOtp(email));
            if (response && response.message) {
                // Success: OTP sent successfully
                if (response.message === 'OTP sent successfully') {
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'OTP has been sent to your email! Please check your inbox.',
                    });
                    animate('right');
                    setStep(2);
                }
                // Info: User not found
                else if (response.message === 'User not found') {
                    Toast.show({
                        type: 'info',
                        text1: 'User Not Found',
                        text2: 'No account exists with this email. Please sign up first.',
                    });
                    navigation.navigate('signupScreen', { email });
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Something went wrong. Please try again later.',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong. Please try again later.',
                });
            }
        } else if (step === 2) {
            if (!otp) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please enter OTP',
                });
                return;
            }
            // Simulate OTP verification
            const response = await dispatch(verifyOtp(otp, email));
            if (response && response.message) {
                // Success: OTP verified successfully
                if (response.message === 'OTP verified successfully') {
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'OTP verified successfully!',
                    });
                    animate('right');
                    setStep(3);
                }
                // Info: Invalid OTP
                else if (response.message === 'Invalid OTP') {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Invalid OTP. Please try again.',
                    });
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Something went wrong. Please try again later.',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong. Please try again later.',
                });
            }

        } else if (step === 3) {
            if (!password || !confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please fill all fields',
                });
                return;
            }
            if (password !== confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Passwords do not match',
                });
                return;
            }

            if (password.length < 8) {
                Toast.show({
                    type: 'info',
                    text1: 'Error',
                    text2: 'Password must be at least 6 characters long',
                });
                return;
            }
            // Password reset success
            const response = await dispatch(resetpassword(email, password));
            if (response && response.message) {
                // Success: Password reset successfully
                if (response.message === 'Password reset successfully') {
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Password reset successfully!. Please log in with your new password.',
                    });
                    navigation.navigate('loginScreen', { email });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: response.message || 'Something went wrong. Please try again later.',
                    });
                }

            }
        }
    };

    const handleBack = () => {
        navigation.goBack();

    };

    // Timer countdown effect
    useEffect(() => {
        let interval;
        if (!canResend && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            setCanResend(true);
        }

        return () => clearInterval(interval);
    }, [canResend, timer]);

    const Resend = async () => {
        if (canResend) {
            // Simulate OTP resend
            setTimer(30);
            setCanResend(false);
            setHasRequestedOtp(true);
            const response = await dispatch(resendOtp(email));
            if (response && response.message) {
                // Success: OTP sent successfully
                if (response.message === 'OTP sent successfully') {
                    Toast.show({
                        type: 'info',
                        text1: 'OTP resent!',
                        text2: 'A new OTP has been sent to your email!',
                    });
                }
                // Info: User not found
                else if (response.message === 'User not found') {
                    Toast.show({
                        type: 'info',
                        text1: 'User Not Found',
                        text2: 'No account exists with this email. Please sign up first.',
                    });
                    navigation.navigate('signupScreen', { email });
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Something went wrong. Please try again later.',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong. Please try again later.',
                });
            }
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.stepImage}
                        />
                        <Text style={styles.stepTitle}>Reset Password</Text>
                        <Text style={styles.stepDescription}>Enter your email address to receive a verification code.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            placeholderTextColor={'#999'}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.stepImage}
                        />
                        <Text style={styles.stepTitle}>Enter OTP</Text>
                        <Text style={styles.stepDescription}>Enter the 6-digit code sent to your email.</Text>
                        {hasRequestedOtp && (
                            <Text style={styles.timerText}>
                                {canResend
                                    ? 'You can now enter the OTP.'
                                    : `Please wait ${timer}s before try another OTP again.`}
                            </Text>
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            value={otp}
                            onChangeText={setOtp}
                            placeholderTextColor={'#999'}
                            maxLength={6}
                        />
                        <TouchableOpacity onPress={() => Resend()} disabled={!canResend}>
                            <Text style={styles.resendText}>
                                {canResend
                                    ? 'Resend OTP'
                                    : `Resend available in ${timer}s`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.stepImage}
                        />
                        <Text style={styles.stepTitle}>New Password</Text>
                        <Text style={styles.stepDescription}>Create a new password for your account.</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor={'#999'}
                                value={password}
                                onChangeText={setPassword}
                                minLength={6}
                                textContentType="password"
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                style={styles.eyeIcon}
                            >
                                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#999" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor={'#999'}
                                value={confirmPassword}
                                minLength={6}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showcPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => setShowcPassword(!showcPassword)} // Toggle showPassword state
                                style={styles.eyeIcon}
                            >
                                <Icon name={showcPassword ? 'eye-slash' : 'eye'} size={24} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Forgot Password</Text>
                <View style={styles.width} />
            </View>

            <ScrollView contentContainerStyle={styles.flexGrow}>
                <Animated.View
                    style={[
                        styles.content,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    {renderStep()}
                </Animated.View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.progressContainer}>
                    {[1, 2, 3].map((i) => (
                        <View
                            key={i}
                            style={[
                                styles.progressDot,
                                i === step && styles.progressDotActive,
                                i < step && styles.progressDotCompleted,
                            ]}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNext}
                    disabled={loading}
                >
                    {loading ? (
                        <Icon name="spinner" size={24} color="#fff" style={styles.icon} />
                    ) : (
                        <>
                            <Text style={styles.buttonText}>
                                {step === 3 ? 'Reset Password' : 'Continue'}
                            </Text>
                            <Icon name="arrow-right" size={24} color="#fff" style={styles.icon} />
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    width: {
        width: 24,
    },
    flexGrow: {
        flexGrow: 1,
    },
    timerText: {
        color: '#f00',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    stepContainer: {
        flex: 1,
        alignItems: 'center',
    },
    stepImage: {
        width: 200,
        height: 200,
        marginBottom: 30,
        borderRadius: 100,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 10,
        textAlign: 'center',
    },
    stepDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#1a1a1a',
        backgroundColor: '#f8f8f8',
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
        padding: 5,
    },
    resendText: {
        color: '#007AFF',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
    footer: {
        padding: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    progressDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#e1e1e1',
        marginHorizontal: 5,
    },
    progressDotActive: {
        backgroundColor: '#007AFF',
        transform: [{ scale: 1.2 }],
    },
    progressDotCompleted: {
        backgroundColor: '#4CAF50',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    icon: {
        marginLeft: 10, // Adds space between text and icon
    },
});
