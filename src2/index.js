import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import AppNavigator from "./Screens";
import Navigation from "./utils/Navigation";

export default class App extends Component {
  render() {
    return (
      <AppNavigator
        ref={navigatorRef => {
          Navigation.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
