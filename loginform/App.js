import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const onPressLogin = async () => {
    setLoading(true);
    axios
      .post("https://payment.pt-mine.id/login.php", {
        useremail: email,
        userpassword: password,
      })
      .then((response) => {
        if (response.data.exampleData1) {
          Alert.alert("Success", response.data.exampleData2);
          if (Platform.OS === "web") {
            alert(response.data.exampleData2);
          }
        } else {
          Alert.alert("Failed", response.data.exampleData2);
          if (Platform.OS === "web") {
            alert(response.data.exampleData2);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.loginLogo}
        source={{
          uri: "https://www.roomie.id/roomieweb/img/logo/roomie-logo-black.png",
        }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#999999"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#999999"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#8EC641" />}
      <Pressable
        onPress={onPressLogin}
        style={styles.loginBtn}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          {loading ? "Please Wait" : "Login"}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginLogo: {
    width: 200,
    height: 46,
    marginBottom: 20,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#E8F0FE",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#1F2937",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#ffffff",
  },
});
