import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ScrollView
} from "react-native";
import Interactable from "react-native-interactable";
const { width, height } = Dimensions.get("window");

import SideMenu from "./side-menu";
import Logo from "./logo";
import BackIcon from "./back-button";
import MainCard from "../../Components/Cards/main";
import BigCard from "../../Components/Cards/big";
import BigCarousel from "../../Components/Carousels/big";

import GetCharities from "../../Components/GetCharities";

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
    this.container.snapTo({ index: 1 });
  };
  render() {
    // this._deltaX.interpolate({
    //     inputRange: [-230, -230, -180, -180],
    //     outputRange: [1, 1, 0, 0]
    //   })

    return (
      <GetCharities>
        {({ data, error, loading }) => {
          if (loading) return <View />;
          return (
            <View
              style={{
                backgroundColor: "rgb(242,247,251)"
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
                  { x: -width * 0.7, strength: 3000, falloff: 0, damping: 0.7 }
                ]}
                onSnap={this.onSnap}
                animatedValueX={this._deltaX}
                snapPoints={[{ x: -width * 0.7 }, { x: 0 }]}
              >
                <View style={styles.page}>
                  <View style={styles.sideMenu}>
                    <SideMenu translateX={this._deltaX} />
                  </View>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <ScrollView
                      scrollEnabled={this.state.scrollable}
                      onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { y: this._scrollY } } }
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
                        <MainCard charity={data.charities[2]} />
                      </Animated.View>
                      <BigCarousel charities={data.charities} />
                      <BigCarousel charities={data.charities.slice(1, 3)} />
                      <BigCarousel charities={[data.charities[3]]} />
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
        )
      </GetCharities>
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
    backgroundColor: "transparent"
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
