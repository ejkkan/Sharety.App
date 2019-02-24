import React, { Component } from "react";
import { View, StyleSheet, Text, Animated, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/MaterialIcons";
import RNMorphingText from "react-native-morphing-text";

class SideMenu extends Component {
  animation = new Animated.Value(0);
  state = {
    text1: "Sharety",
    text2: "",
    text3: "",
    width: 75
  };
  componentDidMount() {
    this.show();
    setTimeout(() => {
      this.setState({
        // text1: "Sharety",
        text3: "Charity made"
      });
    }, 3000);
    setTimeout(() => {
      this.setState({
        // text1: "Sharety",
        text2: "Easy"
      });
    }, 3500);
    setTimeout(() => {
      this.setState({
        // text1: "Sharety",
        text2: "Fun"
      });
    }, 6000);
    setTimeout(() => {
      this.setState({
        // text1: "Sharety",
        // width: 91,
        text3: "Charity made for",
        text2: "You"
      });
    }, 9000);
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
          <RNMorphingText
            animationDuration={5000}
            size={40}
            color="black"
            effect={"scale"}
            fontWeight={"900"}
            height={45}
            value={this.state.text1}
          >
            {this.state.text1}
          </RNMorphingText>
          <View style={{ flexDirection: "row" }}>
            <RNMorphingText
              animationDuration={2000}
              size={11}
              color="black"
              effect={"scale"}
              height={25}
              width={this.state.width}
            >
              {this.state.text3}
            </RNMorphingText>
            <RNMorphingText
              animationDuration={2000}
              size={22}
              color="black"
              effect={"scale"}
              height={30}
            >
              {this.state.text2}
            </RNMorphingText>
          </View>
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
