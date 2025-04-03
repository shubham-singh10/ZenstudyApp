import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

export default function ForgotPassword({ navigation }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const slideAnim = useState(new Animated.Value(0))[0];

    const animate = (direction) => {
        Animated.timing(slideAnim, {
            toValue: direction === 'right' ? 300 : -300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            slideAnim.setValue(0);
        });
    };

    const handleNext = () => {
        if (step === 1) {
            if (!email) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please enter your email',
                });
                return;
            }
            // Simulate email verification
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'OTP sent to your email!',
            });
            animate('right');
            setStep(2);
        } else if (step === 2) {
            if (!otp) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please enter OTP',
                });
                return;
            }
            if (otp !== '123456') { // Demo OTP
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Invalid OTP',
                });
                return;
            }
            animate('right');
            setStep(3);
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
            // Password reset success
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password reset successfully!',
            });
            navigation.navigate('Auth');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            animate('left');
            setStep(step - 1);
        } else {
            navigation.goBack();
        }
    };

    const Resend = () => {
        Toast.show({
            type: 'info',
            text1: 'OTP resent!',
            text2: 'A new OTP has been sent to your email!',
        });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Image
                            source={{ uri: 'https://api.a0.dev/assets/image?text=forgot%20password%20email%20verification&aspect=1:1' }}
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
                            source={{ uri: 'https://api.a0.dev/assets/image?text=otp%20verification%20secure&aspect=1:1' }}
                            style={styles.stepImage}
                        />
                        <Text style={styles.stepTitle}>Enter OTP</Text>
                        <Text style={styles.stepDescription}>Enter the 6-digit code sent to your email.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                            value={otp}
                            onChangeText={setOtp}
                            placeholderTextColor={'#999'}
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                        <TouchableOpacity onPress={() => Resend()}>
                            <Text style={styles.resendText}>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Image
                            source={{ uri: 'https://api.a0.dev/assets/image?text=new%20password%20setup%20secure&aspect=1:1' }}
                            style={styles.stepImage}
                        />
                        <Text style={styles.stepTitle}>New Password</Text>
                        <Text style={styles.stepDescription}>Create a new password for your account.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            placeholderTextColor={'#999'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={'#999'}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
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
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {step === 3 ? 'Reset Password' : 'Continue'}
                    </Text>
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
    resendText: {
        color: '#007AFF',
        fontSize: 16,
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
