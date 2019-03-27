import React, { Component, useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { WebView } from "react-native-webview";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "react-native-firebase";

const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

const advert = firebase
  .admob()
  .interstitial("ca-app-pub-3940256099942544/8691691433");

advert.on("onAdLoaded", () => {
  console.log("Advert ready to show.");
});

advert.on("onRewarded", event => {
  console.log(
    "The user watched the entire video and will now be rewarded!",
    event
  );
});
advert.loadAd(request.build());

const advert2 = firebase
  .admob()
  .rewarded("ca-app-pub-3940256099942544/1033173712");
advert2.loadAd(request.build());
advert2.on("onAdLoaded", () => {
  console.log("Advert ready to show.");
});

advert2.on("onRewarded", event => {
  console.log(
    "The user watched the entire video and will now be rewarded!",
    event
  );
});

//request.addKeyword("foo").addKeyword("bar");

const MovieList = props => {
  const [video, setVideo] = useState(null);
  useEffect(() => {}, []);

  const keyExtractor = () => {
    (item, index) => index.toString();
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          padding: 10,
          paddingTop: 0
        }}
        horizontal={true}
        data={[
          {
            video:
              "https://www.youtube.com/watch?v=M853v2oFQRs&list=PL7hbH0MnzQmCYQI6xEJ2evq5YxO2ltiis",
            thumbnail: "https://img.youtube.com/vi/M853v2oFQRs/mqdefault.jpg",
            amount: 2,
            press: () => advert.show()
          },
          {
            video:
              "https://www.youtube.com/watch?v=XZNP3UDQjnc&list=PLlzeZYnMx7aiP0JLsJlddKFEXw0HkwHf0",
            thumbnail: "https://img.youtube.com/vi/XZNP3UDQjnc/mqdefault.jpg",
            amount: 5,
            press: () => advert2.show()
          },
          {
            video:
              "https://www.youtube.com/watch?v=8pEjd9FxUmA&list=PLjM8RBdREzimessoZnMD3sookWLCR_QR8",
            thumbnail: "https://img.youtube.com/vi/8pEjd9FxUmA/mqdefault.jpg",
            amount: 3
          },
          {
            video:
              "https://www.youtube.com/watch?v=TJmhpWbZSbk&index=5&list=PLjM8RBdREzimessoZnMD3sookWLCR_QR8",
            thumbnail: "https://img.youtube.com/vi/TJmhpWbZSbk/mqdefault.jpg",
            amount: 3
          }
        ]}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: "100%",
                width: 15,
                backgroundColor: "transparent"
              }}
            />
          );
        }}
        renderItem={(e, i) => (
          <TouchableOpacity
            onPress={() => {
              e.item.press();
              //setVideo(e.item.video)
              // Load the advert with our AdRequest
              // Simulate the interstitial being shown "sometime" later during the apps lifecycle
              //   setTimeout(() => {
              //     console.log("timeout");
              //     if (advert.isLoaded()) {
              //       console.log("loaded ");
              //       advert.show();
              //     } else {
              //       // Unable to show interstitial - not loaded yet.
              //     }
              //   }, 1000);
            }}
          >
            {video === e.item.video && (
              <WebView
                source={{ uri: e.item.video }}
                style={{ height: 100, width: 150 }}
              />
            )}
            <ImageBackground
              source={{
                uri: e.item.thumbnail
              }}
              resizeMode="cover"
              borderRadius={8}
              style={{
                borderRadius: 8,
                height: 100,
                width: 150,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 6,
                  backgroundColor: "#ff0000",
                  borderRadius: 4,
                  position: "absolute",
                  right: 5,
                  top: 5
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {e.item.amount}kr
                </Text>
              </View>
              <Icon name="play-circle-outline" size={35} color="black" />
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
{
  /* <WebView
source={{ uri: "https://www.youtube.com/watch?v=mPRXhNFPgwo" }}
style={{ height: 100, width: 150, backgroundColor: "red" }}
/> */
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
  }
});

export default MovieList;
