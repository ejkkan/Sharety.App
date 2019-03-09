import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
const { width } = Dimensions.get("window");

import UserImage from "./user-image";
import AchievementButton from "./AchievementButton";
import UnlockButton from "./UnlockButton";
import UserStats from "../../Components/user-stats";
import ThemePicker from "./theme-picker";

export default class Page extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 220 }}>
          <UserStats />
          <View style={{ marginVertical: 10 }}>
            <ThemePicker />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <UnlockButton />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <AchievementButton />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <UnlockButton />
          </View>
        </ScrollView>
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          <UserImage />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4f2f8"
  }
});
