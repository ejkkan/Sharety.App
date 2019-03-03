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
        text3: "Charity made Fun"
      });
    }, 2500);
    setTimeout(() => {
      this.setState({
        // text1: "Sharety",
        //text2: "Easy",
        text3: "Sharing made Easy"
      });
    }, 5000);
    setTimeout(() => {
      this.setState({
        // text1: "Sharety",
        //text2: "Easy",
        text3: "Sharing for Charity"
      });
    }, 7500);
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
                  outputRange: [-100, 0]
                })
              }
            ]
          }
        ]}
      >
        <View>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              fontFamily: "AvenirNext-Bold"
            }}
          >
            Sharety
          </Text>
          <View style={{ flexDirection: "row" }}>
            <RNMorphingText
              animationDuration={10000}
              size={12}
              color="black"
              font="serif"
              effect={"scale"}
              height={20}
            >
              {this.state.text3}
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
//AvenirNext-Bold
//DamascusBold
//EuphemiaUCAS-Bold
//Futura-CondensedExtraBold
