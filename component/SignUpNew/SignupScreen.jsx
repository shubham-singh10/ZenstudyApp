import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

const SignupScreenNew = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    navigation.navigate("OTP", { email });
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          padding: 16,
          flexGrow: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 400,
            marginHorizontal: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
              color: "#2563EB",
              marginBottom: 24,
            }}
          >
            Create Account
          </Text>

          <View style={{ width: "100%" }}>
            {/* Full Name Input */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#4B5563",
                  marginBottom: 4,
                }}
              >
                Full Name
              </Text>
              <TextInput
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 8,
                  backgroundColor: "#F9FAFB",
                  width: "100%",
                  fontSize: 16,
                }}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
            </View>

            {/* Email Input */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#4B5563",
                  marginBottom: 4,
                }}
              >
                Email
              </Text>
              <TextInput
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 8,
                  backgroundColor: "#F9FAFB",
                  width: "100%",
                  fontSize: 16,
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#4B5563",
                  marginBottom: 4,
                }}
              >
                Password
              </Text>
              <TextInput
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 8,
                  backgroundColor: "#F9FAFB",
                  width: "100%",
                  fontSize: 16,
                }}
                secureTextEntry
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
              />
            </View>

            {/* Confirm Password Input */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#4B5563",
                  marginBottom: 4,
                }}
              >
                Confirm Password
              </Text>
              <TextInput
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 8,
                  backgroundColor: "#F9FAFB",
                  width: "100%",
                  fontSize: 16,
                }}
                secureTextEntry
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                returnKeyType="done"
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#2563EB",
                padding: 12,
                borderRadius: 8,
                fontSize: 16,
                fontWeight: "500",
                width: "100%",
                textAlign: "center",
                marginTop: 8,
              }}
              onPress={handleRegister}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreenNew;
