import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Api } from '../../Api';

const Splash = (props) => {
  useEffect(() => {
      Api.autoSignin();
  }, []);
  return (
      <View style={styles.container}>
          <TouchableOpacity
              style={styles.buttonContainer}
              // onPress={() => {
              //     this.props.navigation.navigate("Main");
              // }}
          >
              <Text style={styles.buttonText}>Splash</Text>
          </TouchableOpacity>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4f2f8"
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
 export default Splash;