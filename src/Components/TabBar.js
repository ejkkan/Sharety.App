import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated
} from "react-native";
const { width } = Dimensions.get("window");
import Shadow from "./Shadow";
import Icon from "react-native-vector-icons/FontAwesome";
import { transform } from "babel-core";

const hitSlop = {
  left: 10,
  right: 20,
  top: 10,
  bottom: 30
};

export default class TabBar extends Component {
  // left = new Animated.Value(0);
  // translateY = new Animated.Value(-100);
  componentDidMount() {
    setTimeout(() => {
      this.animate();
    }, 4000);
  }

  componentWillReceiveProps(nextProps) {
    console.log();
  }

  animate = index =>
    Animated.spring(this.left, {
      toValue: getValue(index),
      duration: 1400,
      useNativeDriver: true
    }).start();

  goToScreen = (screen, index) => {
    console.log("press");
    const { navigation } = this.props;
    this.animate(index);
    navigation.navigate(screen);
  };

  render() {
    const { navigation } = this.props;

    return (
      <Animted.View
        style={[
          styles.container,
          {
            transform: [{ translateY: this.translateY }]
          }
        ]}
      >
        <View style={styles.tabBar}>
          <View style={styles.icomRow}>
            <View>
              <TouchableOpacity
                hitSlop={hitSlop}
                onPress={() => this.goToScreen("Main", 1)}
              >
                <Icon name="eye" size={31} color="gray" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                hitSlop={hitSlop}
                onPress={() => this.goToScreen("UserInfo", 2)}
              >
                <Icon name="pie-chart" size={25} color="gray" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                hitSlop={hitSlop}
                onPress={() => this.goToScreen("Account", 3)}
              >
                <Icon name="user-circle-o" size={25} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 10,
              alignSelf: "center",
              width: 220
            }}
          >
            <Animated.View
              style={[
                {
                  height: 3,
                  width: 3,
                  backgroundColor: "transparent"
                },
                {
                  transform: [
                    {
                      translateX: this.left
                    }
                  ]
                }
              ]}
            />
          </View>
        </View>
      </Animted.View>
    );
  }
}
const getValue = index => {
  if (index === 1) return 0;
  if (index === 2) return 110;
  if (index === 3) return 220;
  return 0;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  tabBar: {
    height: 65,
    alignSelf: "stretch",
    margin: 4,
    marginTop: 0,
    marginBottom: 8,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    // borderTopRightRadius: 12,
    // borderTopLeftRadius: 12,
    borderRadius: 10,
    backgroundColor: "transparent",
    paddingTop: 10,
    paddingHorizontal: 50

    // alignItems: "center"
  },
  icomRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    width: 250
  }
});
