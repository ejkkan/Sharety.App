import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import Shadow from "../../Components/Shadow";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

export default class UnlockButton extends Component<Props> {
  render() {
    return (
      <Shadow style={{ flex: 1 }}>
        <LinearGradient
          useAngle={true}
          angleCenter={{
            x: 0.2,
            y: 0.6
          }}
          colors={[
            "rgb(255,100,300)",
            "rgb(255,147,150)",
            "rgb(255,167,120)",
            "rgb(255,187,125)",
            "rgb(255,200,130)"
          ]}
          style={styles.container}
        >
          <View
            style={{
              position: "absolute",
              opacity: 0.06,
              left: -20,
              bottom: -40,
              transform: [
                {
                  rotate: "50deg"
                }
              ]
            }}
          >
            <Icon name="hand-peace-o" size={140} color="black" />
          </View>
          <Text style={styles.text}>Unlock more awesome features!</Text>
        </LinearGradient>
      </Shadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: 13,
    height: 100,
    width: width - 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    width: 200
  }
});
