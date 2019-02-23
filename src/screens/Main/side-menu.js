import React, { Component } from "react";
import { View, StyleSheet, Text, Animated, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialIcons";

class SideMenu extends Component {
  animation = new Animated.Value(0);
  componentDidMount() {
    this.show();
  }

  show = () =>
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true
    }).start();

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { opacity: this.animation },
          {
            transform: [
              {
                translateX: this.props.translateX.interpolate({
                  inputRange: [-width * 0.7, 0],
                  outputRange: [-70, 0]
                })
              }
            ]
          }
        ]}
      >
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Sharety</Text>
        </View>
        <View style={styles.separator} />
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "100", color: "gray" }}>
            Filter Charitys
          </Text>
        </View>

        <Text style={{ fontSize: 12, fontWeight: "400", marginLeft: 10 }}>
          # Favorities
        </Text>
        {/* <View style={{ position: "absolute", alignSelf: "center", right: 0 }}>
          <Icon name="chevron-right" size={35} color="gray" />
        </View> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 70,
    top: -50
  },
  separator: {
    height: 2,
    backgroundColor: "lightgray",
    marginTop: 10,
    marginBottom: 30,
    width: 100,
    borderRadius: 6
  }
});
export default SideMenu;
