import React, { Component } from "react";
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
import { NavigationActions } from "react-navigation";

import GetCharity from "../../Components/GetCharity";
import UserStats from "../../Components/user-stats";
import PhotoGrid from "../../Components/PhotoGrid";
import DonateLineButton from "../../Components/Button/donate-line";

import { BlurView, VibrancyView } from "react-native-blur";
const platform = Platform.OS;

const { width, height } = Dimensions.get("window");

export default class Charity extends Component {
  state = { viewRef: null };
  opacity = new Animated.Value(0);

  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  };
  componentDidMount() {
    // this.props.navigation.setParams({
    //   tabBarOptions: {
    //     showIcon: false
    //   }
    // });
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }
  renderAndroidBlur = () =>
    platform === "android" &&
    this.state.viewRef && (
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
        viewRef={this.state.viewRef}
        blurType="light"
        blurAmount={10}
      />
    );

  renderIoslur = () =>
    platform === "ios" &&
    this.state.viewRef && (
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
        viewRef={this.state.viewRef}
        blurType="light"
        blurAmount={9}
      />
    );

  render() {
    return (
      <GetCharity id={this.props.navigation.getParam("charity", { id: "" }).id}>
        {({ data, loading }) => {
          const { charity } = data;
          if (loading) return null;
          //return null;
          console.log("viewRef", this.state.viewRef);
          return (
            <View>
              <Animated.View
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  position: "absolute",
                  top: 0,
                  width: width,
                  height: height,
                  opacity: this.opacity
                }}
              />
              <ScrollView
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={true}
                alwaysBounceVertica={true}
                onScroll={e =>
                  e.nativeEvent.contentOffset.y < -0.5 &&
                  this.props.navigation.goBack()
                }
                contentContainerStyle={styles.container}
              >
                <ImageBackground
                  ref={img => {
                    this.backgroundImage = img;
                  }}
                  borderRadius={20}
                  style={styles.card}
                  onLayout={this.imageLoaded}
                  onLoadEnd={this.imageLoaded}
                  source={{
                    uri:
                      !loading && charity && charity.largeImage
                        ? charity.largeImage
                        : ""
                  }}
                >
                  {this.renderIoslur()}
                  <Animated.View
                    style={{
                      opacity: this.opacity,
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
                          Bacon ipsum dolor amet beef ribs landjaeger turkey,
                          flank spare ribs short loin salami. Shank tenderloin
                          landjaeger short loin andouille biltong. Burgdoggen
                          beef meatloaf biltong pancetta, sirloin ribeye
                          leberkas drumstick jerky. Jowl tri-tip venison,
                          shoulder tenderloin brisket leberkas. Shank porchetta
                          beef chuck venison, landjaeger pork belly pastrami.
                          Andouille kevin cow, brisket frankfurter short loin
                          ham hock ribeye spare ribs
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch",
                          marginBottom: 20,
                          justifyContent: "center"
                        }}
                      >
                        <DonateLineButton />
                        <DonateLineButton />
                      </View>
                    </View>
                  </Animated.View>
                </ImageBackground>
                {this.renderAndroidBlur()}
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
                    onPressImage={uri => this.props.navigation.goBack()}
                  />
                </View>
              </ScrollView>
            </View>
          );
        }}
      </GetCharity>
    );
  }
}

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
