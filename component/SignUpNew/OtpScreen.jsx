import React from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Update if needed


export function OTPScreen({ navigation, route }) {
    const [otp, setOtp] = React.useState('');
    const email = route.params.email;

    const handleVerify = () => {
        if (otp.length !== 4) {
            Alert.alert('Please enter a valid 4-digit OTP');
            return;
        }

        // Here you would typically verify the OTP with your backend
        navigation.navigate('One'); // Update navigation target as needed
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: 24
            }}
        >
            <View
                style={{
                    width: '100%',
                    maxWidth: 400,
                    marginHorizontal: 'auto',
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#2563EB",
                        marginBottom: 16,
                    }}
                >
                    Verify Email
                </Text>

                <Text
                    style={{
                        textAlign: "center",
                        color: "#4B5563",
                        marginBottom: 24,
                        fontSize: 16,
                    }}
                >
                    We've sent a verification code to{'\n'}{email}
                </Text>

                <View style={{ marginBottom: 24 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#4B5563",
                            textAlign: "center",
                            marginBottom: 8,
                        }}
                    >
                        Enter 4-digit Code
                    </Text>
                    <TextInput
                        style={{
                            padding: 16,
                            borderWidth: 1,
                            borderColor: "#E5E7EB",
                            borderRadius: 8,
                            backgroundColor: "#F9FAFB",
                            textAlign: "center",
                            fontSize: 24,
                            letterSpacing: 8,
                        }}
                        keyboardType="number-pad"
                        maxLength={4}
                        value={otp}
                        onChangeText={setOtp}
                        placeholder="••••"
                    />
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#2563EB",
                        color: "white",
                        padding: 16,
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: "500",
                        marginBottom: 16,
                        textAlign: "center",
                    }}
                    onPress={handleVerify}
                >
                    <Text style={{ color: "white", textAlign: "center" }}>Verify OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        textAlign: "center",
                        color: "#2563EB",
                        fontSize: 16,
                        fontWeight: "500",
                    }}
                    onPress={() => Alert.alert("New OTP sent!")}
                >
                    <Text>Resend Code</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
