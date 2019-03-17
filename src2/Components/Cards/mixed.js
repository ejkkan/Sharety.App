import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";

import Shadow from "../Shadow";
import Navigation from "../../utils/Navigation";
const { width, height } = Dimensions.get("window");

export default class Mixed extends Component {
  constructor() {
    super();
  }
  render() {
    const { charities } = this.props;
    if (!charities || charities.length === 0) return null;
    if (charities.length === 3) return this.renderThree();
    if (charities.length === 2) return this.renderTwo();
    if (charities.length === 1) return this.renderOne();
    return null;
  }
  renderOne() {
    const { charities } = this.props;
    if (!charities || charities.length === 0) return null;
    return (
      <View style={styles.container}>
        {charities[0] && (
          <Shadow style={{ flex: 1 }}>
            <ImageBackground
              borderRadius={8}
              style={styles.bigCard}
              source={{ uri: charities[0].largeImage }}
              resizeMode="cover"
            />
          </Shadow>
        )}
      </View>
    );
  }
  renderTwo() {
    const { charities } = this.props;
    if (!charities || charities.length === 0) return null;
    return (
      <View style={styles.container}>
        {charities[0] && (
          <View style={styles.column}>
            <Shadow style={{ flex: 1 }}>
              <ImageBackground
                borderRadius={8}
                style={styles.tallCard}
                source={{ uri: charities[0].largeImage }}
                resizeMode="cover"
              />
            </Shadow>
          </View>
        )}
        {charities[1] && (
          <View style={styles.column}>
            <Shadow style={{ flex: 1, marginLeft: 10 }}>
              <ImageBackground
                borderRadius={8}
                style={styles.tallCard}
                source={{ uri: charities[1].largeImage }}
                resizeMode="cover"
              />
            </Shadow>
          </View>
        )}
      </View>
    );
  }
  renderThree() {
    const { charities } = this.props;
    if (!charities || charities.length === 0) return null;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {charities[0] && (
            <TouchableOpacity
              onPress={() =>
                Navigation.navigate("Charity", {
                  charity: charities[0]
                })
              }
              style={{ flex: 1 }}
            >
              <ImageBackground
                borderRadius={8}
                style={styles.smallCard}
                source={{ uri: charities[0].largeImage }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          {charities[1] && (
            <TouchableOpacity
              onPress={() =>
                Navigation.navigate("Charity", {
                  charity: charities[1]
                })
              }
              style={{ flex: 1, marginTop: 10 }}
            >
              <Shadow type="small" style={[styles.tallCar]} />
              <ImageBackground
                borderRadius={8}
                style={styles.smallCard}
                source={{ uri: charities[1].largeImage }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        </View>
        {charities[2] && (
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate("Charity", {
                charity: charities[2]
              })
            }
            style={[styles.column, { marginLeft: 10 }]}
          >
            <Shadow type="small" style={[styles.tallCar]} />
            <ImageBackground
              borderRadius={8}
              style={styles.tallCard}
              source={{ uri: charities[2].largeImage }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 200,
    maxHeight: width - 40,
    borderRadius: 8,
    marginTop: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  smallCard: {
    width: width / 2 - 25,
    flex: 1,
    flexGrow: 1,
    borderRadius: 8,
    elevation: 20
  },
  tallCard: {
    width: width / 2 - 25,
    flex: 1,
    borderRadius: 8,
    elevation: 20
  },
  bigCard: {
    width: width - 40,
    flex: 1,
    borderRadius: 8,
    elevation: 20,
    alignSelf: "center"
  }
});
