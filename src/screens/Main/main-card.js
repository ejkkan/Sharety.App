import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  Text
} from "react-native";

//import Shadow from "../Shadow";
const { width, height } = Dimensions.get("window");

import Icon from "react-native-vector-icons/MaterialIcons";

export default class BigCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { charity } = this.props;
    if (!charity) return null;
    return (
      <View
        style={{
          width,
          alignItems: "center",
          justifyContent: "center",
          height
        }}
      >
        {/* <Shadow> */}
          <ImageBackground
            borderRadius={8}
            style={styles.card}
            source={{ uri: charity.largeImage }}
          >
            <Text
              style={{
                fontSize: 40,
                color: "white"
              }}
            >
              {charity.title}
            </Text>
            <Text
              numberOfLines={3}
              style={{
                color: "white",
                fontSize: 15,
                width: 270,
                marginTop: 20
              }}
            >
              {charity.description}
            </Text>
          </ImageBackground>
        {/* </Shadow> */}
        <View style={{ marginTop: 40 }}>
          <Icon name="keyboard-arrow-down" size={45} color="gray" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: 450,
    borderRadius: 8,
    marginTop: 40,
    elevation: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent"
  }
});
