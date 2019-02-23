import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";

import Shadow from "../Shadow";
const { width, height } = Dimensions.get("window");

export default class BigCard extends Component {
  constructor() {
    super();
  }
  render() {
    const { charity } = this.props;
    if (!charity) return null;
    return (
      <Shadow>
        <ImageBackground
          borderRadius={8}
          style={styles.card}
          source={{ uri: charity.largeImage }}
        />
      </Shadow>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: 220,
    borderRadius: 8,
    marginTop: 20,
    elevation: 20
  }
});
