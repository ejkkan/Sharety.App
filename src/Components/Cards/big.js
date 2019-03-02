import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";

import Shadow from "../Shadow";
import SubscribeButton from "../Button/subscribe";
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
        >
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              alignItems: "flex-end",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 10,
                flexGrow: 1,
                backgroundColor: "blue"
              }}
            >
              <SubscribeButton charity={charity} />
              <SubscribeButton charity={charity} />
            </View>
          </View>
        </ImageBackground>
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
