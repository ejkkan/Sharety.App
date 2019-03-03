import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import Shadow from "../../Components/Shadow";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

export default class AreaButton extends Component<Props> {
  render() {
    return (
      <Shadow type="small">
        <LinearGradient
          useAngle={true}
          colors={[
            "rgba(255,255,255,1)",
            "rgba(255,255,255,1)",
            "rgba(255,255,255,1)"
          ]}
          style={styles.container}
        >
          <View
            style={{
              // position: "absolute",
              left: -150,
              top: -150,
              opacity: 0.02
            }}
          >
            <Icon name="chevron-right" size={400} color="black" />
          </View>
          <Text style={styles.backgroundText}>Achievements</Text>
          <Text style={styles.text}>Achievements</Text>
        </LinearGradient>
      </Shadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 13,
    height: 100,
    // flexGrow: 1,
    marginHorizontal: 20,
    overflow: "hidden"
  },
  backgroundText: {
    fontSize: 50,
    color: "black",
    position: "absolute",
    fontWeight: "600",
    left: 20,
    top: 30,
    opacity: 0.2
  },
  text: {
    fontSize: 25,
    position: "absolute",
    left: 25,
    bottom: 15
  }
});
