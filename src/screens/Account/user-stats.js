import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import Shadow from "../../Components/Shadow";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

export default class UnlockButton extends Component<Props> {
  renderItem = (amount, text, icon) => {
    return (
      <View style={styles.item}>
        <View style={{ position: "absolute", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "black"
            }}
          >
            {amount}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "black",
              opacity: 0.7
            }}
          >
            {text}
          </Text>
        </View>
        <View style={{ opacity: 0.03 }}>
          <Icon name={icon} size={60} color="black" />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderItem(11010, "Total", "cloud")}
        {this.renderItem(4, "Support", "bookmark")}
        {this.renderItem(18, "Streak", "star")}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: 300,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  }
});
