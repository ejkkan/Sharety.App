import React, { Component, useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Platform,
  ImageBackground,
  findNodeHandle,
  SafeAreaView,
  StatusBar
} from "react-native";
import Interactable from "react-native-interactable";

import UserStats from "../../Components/user-stats";
import PhotoGrid from "../../Components/PhotoGrid";
import DonateLineButton from "../../Components/Buttons/donate-line";
import Navigation from "../../utils/Navigation";
import { BlurView, VibrancyView } from "react-native-blur";
import { Api } from "../../Api";
import MovieList from "./movie-list";
import SwipeOut from "./swipeout";

const platform = Platform.OS;

const { width, height } = Dimensions.get("window");

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};

const Charity = props => {
  const [viewRef, setViewRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charity, setCharity] = useState(props.navigation.getParam("charity"));
  const opacity = useRef(new Animated.Value(0)).current;
  const backgroundImage = useRef(null);
  const container = useRef(null);
  const imageLoaded = () => {
    setViewRef(findNodeHandle(backgroundImage.current));
  };
  useEffect(() => {
    getCharity();
  }, []);

  const getCharity = async () => {
    let charity = await Api.getCharity({
      id: props.navigation.getParam("charity", { id: "" }).id
    });
    setCharity(charity);
  };

  const snapTo = () => {
    container.current.snapTo({ index: 1 });
  };
  const onSnap = e => {
    const { index } = e.nativeEvent;
    if (Object.keys(e.nativeEvent)[0] === "close") {
      container.current.snapTo({ index: 6 });
      props.navigation.goBack();
    }
  };

  const renderAndroidBlur = () =>
    platform === "android" &&
    viewRef && (
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
          //   backgroundColor: "rgba(155,155,155,0)"
        }}
        // borderTopRightRadius={20}
        viewRef={viewRef}
        blurType="dark"
        blurRadius={9}
        blurAmount={10}
      />
    );
  const renderIoslur = () =>
    platform === "ios" &&
    viewRef && (
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }}
        // borderTopRightRadius={20}
        viewRef={viewRef}
        blurType="light"
        blurAmount={9}
      />
    );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Interactable.View
          style={{
            width: width - 10,
            marginLeft: 5
          }}
          ref={container}
          onLayout={snapTo}
          verticalOnly={true}
          snapPoints={[
            { y: 40 },
            { y: StatusBar.currentHeight },
            { y: -Screen.height / 2 },
            { y: -Screen.height / 3 },
            { y: -Screen.height / 4 },
            { y: -Screen.height },
            { y: Screen.height }
          ]}
          alertAreas={[{ id: "close", influenceArea: { top: 85 } }]}
          onAlert={onSnap}
          boundaries={{ top: -height }}
          initialPosition={{ y: 80 }}
          animatedValueY={this._deltaY}
        >
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
            </View>
            <ImageBackground
              ref={backgroundImage}
              style={styles.card}
              onLayout={imageLoaded}
              onLoadEnd={imageLoaded}
              source={{
                uri:
                  !loading && charity && charity.largeImage
                    ? charity.largeImage
                    : ""
              }}
            >
              {renderIoslur()}
            </ImageBackground>
            {renderAndroidBlur()}
            <SwipeOut />
            <Text style={styles.panelTitle}>Watch To Donate</Text>
            <MovieList />
            <PhotoGrid
              width={width - 20}
              source={[
                charity.image,
                charity.image,
                charity.image,
                charity.image,
                charity.image,
                charity.image
              ]}
              // onPressImage={uri => props.navigation.goBack()}
            />
          </View>
        </Interactable.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#e4f2f8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 5,
    width: width - 10
  },
  card: {
    height: width - 20,
    width: width - 20
    // elevation: 20,
  },
  panel: {
    height: Screen.height + 300,
    backgroundColor: "#f0f0f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    padding: 5,
    paddingTop: 20
  },
  panelHeader: {
    alignItems: "center"
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10
  }
});

const images = [
  "https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg"
];

export default Charity;
