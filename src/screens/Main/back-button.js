import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
const { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialIcons";

class SideMenu extends Component {
  animation = new Animated.Value(0);
  show = () =>
    Animated.timing(this.animation, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  hide = () =>
    Animated.timing(this.animation, {
      toValue: 0,
      useNativeDriver: true
    }).start();

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <Animated.View
          style={[
            styles.logo,
            {
              opacity: this.animation
            },
            {
              transform: [
                {
                  translateX: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10],
                    extrapolate: "clamp"
                  })
                }
              ]
            }
          ]}
        >
          <Icon name="chevron-left" size={35} color="gray" />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 30,
    left: 0,
    alignSelf: "center",
    height: 30,
    width: 30,
    borderRadius: 35
  }
});
export default SideMenu;
