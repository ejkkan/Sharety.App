import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import Shadow from "../../Components/Shadow";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

export default class UnlockButton extends Component<Props> {
  render() {
    return (
      <LinearGradient
        useAngle={true}
        angleCenter={{
          x: 0.2,
          y: 0.6
        }}
        colors={[
          //   "rgb(255,60,100)",
          "rgb(255,100,100)",
          "rgb(255,147,100)",
          "rgb(255,167,120)",
          "rgb(255,187,125)",
          "rgb(255,200,130)"
        ]}
        style={styles.container}
      >
        <View style={{ opacity: 0.3, top: 10 }}>
          <Icon name="user-plus" size={40} color="black" />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: width / 2,
    height: width / 1.75,
    borderBottomRightRadius: 10
  }
});
