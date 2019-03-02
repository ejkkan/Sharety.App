import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
const { width, height } = Dimensions.get("window");

export default class CreditCard extends Component {
  constructor() {
    super();
  }
  onChange = e => {
    console.log("here", e);
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          margin: 80,
          backgroundColor: "white",
          borderRadius: 15
        }}
      >
        <CreditCardInput onChange={this._onChange} />
      </View>
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
