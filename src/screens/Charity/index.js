import React, { Component, useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  findNodeHandle,
  Animated,
  SafeAreaView,
  Platform
} from "react-native";

import UserStats from "../../Components/user-stats";
import PhotoGrid from "../../Components/PhotoGrid";
import DonateLineButton from "../../Components/Buttons/donate-line";
import Navigation from "../../utils/Navigation";
import { BlurView, VibrancyView } from "react-native-blur";
import { Api } from "../../Api";

const platform = Platform.OS;

const { width, height } = Dimensions.get("window");

const Charity = props => {
  const [viewRef, setViewRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charity, setCharity] = useState(props.navigation.getParam("charity"));
  const opacity = useRef(new Animated.Value(0)).current;
  const backgroundImage = useRef(null);

  const imageLoaded = () => {
    setViewRef(findNodeHandle(backgroundImage.current));
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    getCharity();
  }, []);

  const getCharity = async () => {
    let charity = await Api.getCharity({
      id: props.navigation.getParam("charity", { id: "" }).id
    });
    setCharity(charity);
  };

  const onPressDonate = () => {
    Navigation.navigate("PriceInput", { charity });
  };
  const onPressSubscribe = () => {};

  const renderAndroidBlur = () =>
    platform === "android" &&
    viewRef && (
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          borderRadius: 15,
          backgroundColor: "rgba(155,155,155,0.3)"
        }}
        // borderTopRightRadius={20}
        viewRef={viewRef}
        blurType="light"
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
          top: 0,
          borderRadius: 15
        }}
        // borderTopRightRadius={20}
        viewRef={viewRef}
        blurType="light"
        blurAmount={9}
      />
    );

  return (
    <View>
      <Animated.View
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          position: "absolute",
          top: 0,
          width: width,
          height: height,
          opacity: opacity
        }}
      />
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertica={true}
        onScroll={e =>
          e.nativeEvent.contentOffset.y < -0.5 && props.navigation.goBack()
        }
        contentContainerStyle={styles.container}
      >
        <ImageBackground
          ref={backgroundImage}
          borderRadius={20}
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
          <Animated.View
            style={{
              opacity: opacity,
              width: width - 10
            }}
          >
            <View
              style={{
                height: height / 2,
                alignSelf: "stretch",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  padding: 30,
                  marginTop: 20,
                  flex: 1,
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    textAlign: "center",
                    marginBottom: 20,
                    color: "rgb(0,0,0)"
                  }}
                >
                  {charity.title}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "rgb(0,0,0)"
                  }}
                >
                  Bacon ipsum dolor amet beef ribs landjaeger turkey, flank
                  spare ribs short loin salami. Shank tenderloin landjaeger
                  short loin andouille biltong. Burgdoggen beef meatloaf biltong
                  pancetta, sirloin ribeye leberkas drumstick jerky. Jowl
                  tri-tip venison, shoulder tenderloin brisket leberkas. Shank
                  porchetta beef chuck venison, landjaeger pork belly pastrami.
                  Andouille kevin cow, brisket frankfurter short loin ham hock
                  ribeye spare ribs
                </Text>
                <DonateLineButton text={"DONATE"} onCallback={onPressDonate} />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  marginBottom: 20,
                  justifyContent: "center"
                }}
              >
                <DonateLineButton text={"DONATE"} onCallback={onPressDonate} />
                {/* <DonateLineButton text={"SUBSCRIBE"} onCallback={onPressSubscribe}/> */}
              </View>
            </View>
          </Animated.View>
        </ImageBackground>
        {renderAndroidBlur()}
        <View style={{ top: -50 }}>
          <View
            style={{
              backgroundColor: "#e4f2f8"
            }}
          >
            <UserStats />
          </View>
          <PhotoGrid
            width={width - 10}
            source={[
              charity.image,
              charity.image,
              charity.image,
              charity.image,
              charity.image,
              charity.image
            ]}
            onPressImage={uri => props.navigation.goBack()}
          />
          <DonateLineButton text={"DONATE"} onCallback={onPressDonate} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#e4f2f8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 40,
    marginHorizontal: 5,
    width: width - 10
  },
  card: {
    height: height / 2 + 25,
    width: width - 10
    // elevation: 20,
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
