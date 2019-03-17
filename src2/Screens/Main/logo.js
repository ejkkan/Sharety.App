import React, { Component } from "react";
import { View, StyleSheet, Text, Animated, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

class SideMenu extends Component {
  render() {
    return (
      <Animated.View
        style={[
          styles.logo,
          {
            opacity: this.props.translateY.interpolate({
              inputRange: [0, 70],
              outputRange: [1, 0],
              extrapolate: "clamp"
            })
          },
          {
            transform: [
              {
                scale: this.props.translateY.interpolate({
                  inputRange: [0, 70],
                  outputRange: [1, 0.2],
                  extrapolate: "clamp"
                })
              }
            ]
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 30,
    alignSelf: "center",
    height: 50,
    width: 50,
    borderRadius: 35,
    backgroundColor: "red"
  }
});
export default SideMenu;
