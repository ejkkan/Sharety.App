import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  findNodeHandle,
  Animated
} from "react-native";
import { NavigationActions } from "react-navigation";

import GetCharity from "../../Components/GetCharity";
import UserStats from "../../Components/user-stats";
import PhotoGrid from "../../Components/PhotoGrid";
import DonateLineButton from "../../Components/Button/donate-line";

import { BlurView, VibrancyView } from "react-native-blur";

const { width, height } = Dimensions.get("window");

export default class Charity extends Component {
  state = { viewRef: null };
  opacity = new Animated.Value(0);
  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  };
  componentDidMount() {
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }
  render() {
    return (
      <GetCharity id={this.props.navigation.getParam("charity", { id: "" }).id}>
        {({ data, loading }) => {
          const { charity } = data;
          if (loading) return null;
          //return null;
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
                showsVerticalScrollIndicator={false}
                bounces={true}
                alwaysBounceVertica={true}
                onScroll={e =>
                  e.nativeEvent.contentOffset.y < -0.5 &&
                  this.props.navigation.goBack()
                }
                // contentOffset={e =>
                //   e.y < -0.5 && this.props.navigation.goBack()
                // }
                contentContainerStyle={styles.container}
              >
                <ImageBackground
                  borderRadius={20}
                  style={styles.card}
                  onLoadEnd={this.imageLoaded}
                  source={{
                    uri:
                      !loading && charity && charity.largeImage
                        ? charity.largeImage
                        : ""
                  }}
                >
                  <Animated.View
                    style={{
                      opacity: this.opacity
                    }}
                  >
                    <View
                      style={{
                        height: height / 2,
                        width,
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width,
                          justifyContent: "center"
                        }}
                      >
                        <DonateLineButton />
                        <DonateLineButton />
                      </View>
                    </View>
                    <BlurView
                      // ref={img => {
                      //   this.backgroundImage = img;
                      // }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        borderRadius: 15
                      }}
                      borderTopRightRadius={20}
                      viewRef={this.state.viewRef}
                      blurType="light"
                      blurAmount={10}
                    />
                  </Animated.View>
                </ImageBackground>
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
    marginTop: 20,
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
