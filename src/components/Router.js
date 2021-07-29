import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";

import Landing from "./Landing";
import About from "./About/About";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import TripHistory from "./Trip/TripHistory";
import Trip from "./Trip/Trip";
import RiderPayment from "./Trip/RiderPayment";
import DashboardDriver from "./Dashboard/DriverDash";
import Profile from "./Dashboard/Profile";

export default function Router() {
  return (
    <NativeRouter>
      <SafeAreaView style={styles.container}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard/driver" component={DashboardDriver} />
          <Route path="/dashboard/history" component={TripHistory} />
          <Route path="/trip" component={Trip} />
          <Route path="/payment" component={RiderPayment} />
        </Switch>
        <StatusBar style="auto" />
      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00a88a",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontFamily: "Helvetica",
    fontSize: 40,
    color: "#fff",
  },
});
