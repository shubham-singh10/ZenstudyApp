import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const LoginScreen = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login Button Clicked');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>ZenStudy.</Text>
                <Text style={styles.helpText}>Help</Text>
            </View>

            {/* Image Section */}
            <View style={styles.imageContainer}>
                {/* <Image
                    style={styles.image}
                    source={require('./path_to_your_image')} // replace with your local image path
                /> */}
            </View>

            {/* Title Section */}
            <View style={styles.titleContainer}>
                <Text style={styles.loremText}>Lorem Ipsum has been</Text>
                <Text style={styles.loremSubText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
            </View>

            {/* Login Section */}
            <Text style={styles.welcomeText}>Welcome To <Text style={styles.brandName}>ZenStudy</Text></Text>
            <Text style={styles.taglineText}>Curiosity | Intutive Study | Imaginative</Text>

            <Text style={styles.loginText}>Login</Text>

            {/* Mobile Number Input */}
            <View style={styles.inputContainer}>
                {/* <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: '+91', value: '91' },
                        { label: '+1', value: '1' },
                        { label: '+44', value: '44' }
                    ]}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{ label: '+91', value: null }}
                /> */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Mobile Number"
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>New User? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupLink}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    helpText: {
        fontSize: 16,
        color: '#007BFF',
    },
    imageContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    loremText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    loremSubText: {
        fontSize: 14,
        color: '#7E7E7E',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    brandName: {
        color: '#007BFF',
    },
    taglineText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#7E7E7E',
    },
    loginText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
    icon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        fontSize: 14,
        color: '#7E7E7E',
    },
    signupLink: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: 'bold',
    },
});

// Picker styles
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 5,
        color: '#000',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderRadius: 5,
        color: '#000',
        paddingRight: 30,
    },
});

export default LoginScreen;