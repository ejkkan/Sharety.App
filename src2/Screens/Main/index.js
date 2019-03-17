import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ScrollView,
  Vibration,
  Text
} from "react-native";
import Interactable from "react-native-interactable";
const { width, height } = Dimensions.get("window");
import { Query } from "react-apollo";

import SideMenu from "./side-menu";
import Logo from "./logo";
import BackIcon from "./back-button";
import MainCard from "../../Components/Cards/main";
import BigCard from "../../Components/Cards/big";
import BigCarousel from "../../Components/Carousels/big";

import GetCharities from "../../Components/GetCharities";
import GetUser from "../../Components/GetUser";

import { adopt } from "react-adopt";
import { formatSubscribingCharities } from "../../utils/helpers";

const Composed = adopt({
  content: <GetCharities />,
  user: <GetUser />
});

let lastIndex = 1;
export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      scrollable: false
    };
    this._scrollY = new Animated.Value(0);
    this._deltaX = new Animated.Value(0);
    this._cardFadeIn = new Animated.Value(0);
  }

  componentDidMount() {
    this.show();
  }

  show = () =>
    Animated.timing(this._cardFadeIn, {
      toValue: 1,
      duration: 700,
      delay: 1500,
      useNativeDriver: true
    }).start();

  onSnap = phase => {
    Vibration.vibrate(200);
    if (phase.nativeEvent.index === 0) {
      this.backIcon.show();
      this.setState({ scrollable: true });
    }
    if (phase.nativeEvent.index === 1 && lastIndex === 0) {
      this.backIcon.hide();
      this.setState({ scrollable: false });
    }
    lastIndex = phase.nativeEvent.index;
  };
  onBackPress = () => {
    setCount(count + 1);
    this.container.snapTo({ index: 1 });
  };

  render() {
    // this._deltaX.interpolate({
    //     inputRange: [-230, -230, -180, -180],
    //     outputRange: [1, 1, 0, 0]
    //   })

    return (
      <View style={{ backgroundColor: "#e4f2f8" }}>
        <Composed>
          {({ content, user }) => {
            if (content.loading) return null;
            const charities = formatSubscribingCharities(
              content.data.charities,
              content.data.subscriptionItems
            );
            // console.log("fetchedCharities", fetchedCharities);
            // const me = user.data.user;
            // console.log("me", me);

            return (
              <View
                style={{
                  backgroundColor: "#e4f2f8"
                }}
              >
                <Interactable.View
                  ref={container => (this.container = container)}
                  style={{
                    width: width * 1.7,
                    height,
                    backgroundColor: "transparent"
                  }}
                  horizontalOnly={true}
                  animatedNativeDriver={true}
                  gravityPoints={[
                    {
                      x: -width * 0.7,
                      strength: 3000,
                      falloff: 0,
                      damping: 0.7
                    }
                  ]}
                  onSnap={this.onSnap}
                  animatedValueX={this._deltaX}
                  snapPoints={[{ x: -width * 0.7 }, { x: 0 }]}
                  onSnapStart={() => console.log("spdiojfhs")}
                >
                  <View style={styles.page}>
                    <View style={styles.sideMenu}>
                      <SideMenu translateX={this._deltaX} />
                    </View>
                    <View style={{ flexDirection: "column", flex: 1 }}>
                      <ScrollView
                        scrollEnabled={this.state.scrollable}
                        onScroll={Animated.event([
                          {
                            nativeEvent: { contentOffset: { y: this._scrollY } }
                          }
                        ])}
                        contentContainerStyle={styles.mainContent}
                      >
                        <Animated.View
                          style={{
                            opacity: this._cardFadeIn,
                            transform: [
                              {
                                translateX: this._cardFadeIn.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [100, 0]
                                })
                              }
                            ]
                          }}
                        >
                          <MainCard charity={charities[1]} />
                        </Animated.View>
                        <Text>{count}</Text>
                        <BigCarousel type="mixed" charities={charities} />
                        <BigCarousel charities={charities} />
                        <BigCarousel type="mixed" charities={charities} />
                        <BigCarousel charities={charities} />
                        {/* <BigCarousel charities={[data.charities[3]]} /> */}
                      </ScrollView>
                    </View>
                  </View>
                </Interactable.View>
                {/* <Logo translateY={this._scrollY} /> */}
                <BackIcon
                  onPress={this.onBackPress}
                  ref={backIcon => (this.backIcon = backIcon)}
                />
              </View>
            );
          }}
        </Composed>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  page: {
    width: width * 1.7,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  sideMenu: {
    width: width * 0.7,
    height: 180,
    height
  },
  mainContent: {
    width,
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 80
  },
  card: {
    width: 300,
    height: 380,
    backgroundColor: "#542790",
    borderRadius: 8,
    marginTop: 20,
    elevation: 20
  },
  smallCard: {
    width: 300,
    height: 200,
    backgroundColor: "#542790",
    borderRadius: 8,
    marginTop: 20,
    elevation: 20
  },
  label: {
    textAlign: "center",
    fontSize: 24
  }
});
