import React, { Component, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ScrollView,
  Vibration,
  Text,
  StatusBar
} from "react-native";
import Interactable from "react-native-interactable";
const { width, height } = Dimensions.get("window");

import SideMenu from "./side-menu";
import BackIcon from "./back-button";
import MainCard from "./main-card";
import BigCarousel from "../../Components/Carousels/big-carousel";
import { Api } from "../../Api";
import Navigation from "../../utils/Navigation";

import { RNNotificationBanner } from "react-native-notification-banner";

import Icon from "react-native-vector-icons/FontAwesome";
let copy = (
  <Icon name="copy" size={24} color="#FFFFFF" family={"FontAwesome"} />
);

// import { formatSubscribingCharities } from "../../utils/helpers";

let lastIndex = 1;
const Main = props => {
  const container = useRef(null);
  const backIcon = useRef(null);

  const [scrollable, setScrollable] = useState(false);
  const [charities, setCarities] = useState([]);
  const _cardFadeIn = useRef(new Animated.Value(0)).current;
  const _deltaX = useRef(new Animated.Value(0)).current;
  const _scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getCharities();
  }, []);

  const getCharities = async () => {
    let charities = await Api.getCharities();
    setCarities(charities.data.charities);
    show();
  };
  const show = () =>
    Animated.timing(_cardFadeIn, {
      toValue: 1,
      duration: 700,
      delay: 1500,
      useNativeDriver: true
    }).start();

  const onSnap = phase => {
    Vibration.vibrate(200);
    if (phase.nativeEvent.index === 0) {
      backIcon.current.show();
      setScrollable(true);
    }
    if (phase.nativeEvent.index === 1 && lastIndex === 0) {
      backIcon.current.hide();
      setScrollable(false);
    }
    lastIndex = phase.nativeEvent.index;
  };
  const onBackPress = () => {
    RNNotificationBanner.Show({
      tintColor: "#f47141",
      title: "Rump kevin pancetta",
      duration: 5,
      subTitle:
        "Bacon ipsum dolor amet beef short loin frankfurter tri-tip t-bone jerky. Sausage swine pancetta kielbasa. Jowl leberkas fatback corned beef",
      withIcon: true,
      icon: copy
    });

    // container.current.snapTo({ index: 1 });
  };

  return (
    <View style={{ backgroundColor: "#e4f2f8", flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      {console.log("_cardFadeIn", charities)}
      <Interactable.View
        ref={container}
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
        onSnap={onSnap}
        animatedValueX={_deltaX}
        snapPoints={[{ x: -width * 0.7 }, { x: 0 }]}
        onSnapStart={() => console.log("spdiojfhs")}
      >
        <View style={styles.page}>
          <View style={styles.sideMenu}>
            <SideMenu translateX={_deltaX} />
          </View>
          <View style={{ flexDirection: "column", flex: 1 }}>
            {charities.length > 0 && (
              <ScrollView
                scrollEnabled={scrollable}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                  {
                    nativeEvent: { contentOffset: { y: _scrollY } }
                  }
                ])}
                contentContainerStyle={styles.mainContent}
              >
                <Animated.View
                  style={{
                    opacity: _cardFadeIn,
                    transform: [
                      {
                        translateX: _cardFadeIn.interpolate({
                          inputRange: [0, 1],
                          outputRange: [100, 0]
                        })
                      }
                    ]
                  }}
                >
                  <MainCard charity={charities[1]} />
                </Animated.View>
                <BigCarousel type="mixed" charities={charities} />
                <BigCarousel charities={charities} />
                <BigCarousel type="mixed" charities={charities} />
                <BigCarousel charities={charities} />
                {/* <BigCarousel charities={[data.charities[3]]} /> */}
              </ScrollView>
            )}
          </View>
        </View>
      </Interactable.View>
      {/* <Logo translateY={this._scrollY} /> */}
      <BackIcon onPress={onBackPress} ref={backIcon} />
    </View>
  );
};

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
export default Main;
