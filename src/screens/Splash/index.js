import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import GetUser from "../../Components/GetUser";
import Auth from "../../Components/AuthCheck";

export default class Page extends Component {
  render() {
    return (
      <Auth>
        {() => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  this.props.navigation.navigate("MAIN");
                }}
              >
                <Text style={styles.buttonText}>SPLASH</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Auth>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
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
