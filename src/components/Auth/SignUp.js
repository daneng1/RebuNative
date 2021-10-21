import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Link, Redirect } from "react-router-native";
import axios from "axios";
import { SiteContext } from "./context.js";

export default function SignIn() {
  const context = useContext(SiteContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [success, setSuccess] = useState(false);

  let handleUserName = (e, name) => {
    context.setUser({ ...context.user, username: e });
  };

  let handlePassword = (e, name) => {
    context.setUser({ ...context.user, password: e });
  };

  let handleRole = (e, name) => {
    context.setUser({ ...context.user, role: e });
  };

  const handleSubmit = async () => {
    const api = "https://brsmith-auth-api.herokuapp.com/signup";
    await axios({
      method: "post",
      url: api,
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      data: context.user,
    }).then((response) => {
      context.setToken(response.data.token);

      if (response.status === 201) {
        context.setUser(response.data.user);
        setSuccess(true);
        createTwoButtonAlert();
      }
      if (response.status === 500) {
        Alert.alert("Error", "Please choose another username.", [
          { text: "OK" },
        ]);
      }
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Success!",
      "Your user has been created. Please sign in to access the site",
      [{ text: "OK", onPress: () => console.log("OK") }]
    );

  const toggleSwitch = () => {
    if (context.user.role === "driver") {
      handleRole("rider", "role");
      setIsEnabled(false);
    } else {
      handleRole("driver", "role");
      setIsEnabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.roleSwitch}>
        <Text style={styles.switchText}>Rider</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#fff", true: "#3e3e3e" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
        <Text style={styles.switchText}>Driver</Text>
      </View>
      <TextInput
        style={styles.input}
        textContentType="username"
        onChangeText={(e) => handleUserName(e, "username")}
        placeholder="Username"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        textContentType="password"
        onChangeText={(e) => handlePassword(e, "password")}
        placeholder="Password"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        title="Sign Up"
      >
        <Text style={{ color: "#00a88a", fontSize: 16 }}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Already Signed up?</Text>
      <Link style={styles.link} to={"/signin"}>
        <Text
          style={
            (styles.text,
            {
              textDecorationLine: "underline",
              textAlign: "center",
              color: "white",
            })
          }
        >
          Go To Sign In
        </Text>
      </Link>
      {success ? (
        <Redirect
          to={{
            pathname: "/signin",
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  roleSwitch: {
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    color: "black",
    backgroundColor: "white",
    width: 250,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 5,
    height: 40,
    margin: "auto",
    marginBottom: 20,
    borderColor: "#7a42f4",
  },
  link: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 6,
    marginBottom: 80,
    alignItems: "center",
    width: 250,
  },
  switch: {
    marginBottom: 40,
  },
  roleSwitch: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  switchText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
