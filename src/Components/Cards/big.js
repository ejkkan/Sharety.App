import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";

import Shadow from "../Shadow";
import DonateButton from "../Button/donate";
import SubscribeButton from "../Button/subscribe";
import UpdateSubscriptionButton from "../Button/update-subscription";
const { width, height } = Dimensions.get("window");
import { Text } from "react-native";
import Navigation from "../../utils/Navigation";

export default class BigCard extends Component {
  constructor() {
    super();
  }
  render() {
    const { charity } = this.props;
    if (!charity) return null;
    return (
      <View>
        <Shadow>
          <View style={[styles.card, { position: "absolute" }]} />
        </Shadow>
        <TouchableOpacity
          onPress={() =>
            Navigation.navigate("Charity", {
              charity
            })
          }
        >
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
                <Text
                  style={{
                    color: "white",
                    fontSize: 25
                  }}
                >
                  {charity.title}
                </Text>
                {charity.subscribing ? (
                  <UpdateSubscriptionButton charity={charity} />
                ) : (
                  <SubscribeButton charity={charity} />
                )}
                <DonateButton charity={charity} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
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
