import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import Interactable from "react-native-interactable";
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonComponent, {
  CircleButton,
  RoundButton
} from "react-native-button-component";

const { width } = Dimensions.get("window");

const SwipeOut = props => {
  const swiper = useRef(null);
  const _deltaX = useRef(new Animated.Value(0)).current;
  const [containerState, setContainerState] = useState(0);
  const [price, setPrice] = useState(null);

  const updateContainer = e => {
    const { index } = e.nativeEvent;
    setContainerState(index);
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "transparent" }}>
        <View
          style={{
            position: "absolute",
            right: 0,
            height: 65,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: _deltaX.interpolate({
                  inputRange: [-230, -230, -180, -180],
                  outputRange: [1, 1, 0, 0]
                }),
                transform: [
                  {
                    scale: _deltaX.interpolate({
                      inputRange: [-230, -230, -180, -180],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }
                ]
              }
            ]}
          >
            <TextInput
              autoFocus
              value={price}
              style={{
                height: 44,
                fontSize: 30,
                width: 100,
                fontWeight: "bold",
                borderWidth: 0,
                paddingLeft: 5
              }}
              placeholder="500 kr"
              onChangeText={setPrice}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: _deltaX.interpolate({
                  inputRange: [-165, -165, -115, -115],
                  outputRange: [1, 1, 0, 0]
                }),
                transform: [
                  {
                    scale: _deltaX.interpolate({
                      inputRange: [-165, -165, -115, -115],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }
                ]
              }
            ]}
          >
            <RoundButton
              buttonState={price ? "valid" : "invalid"} // "upload" or "uploading"
              gradientStart={{ x: 0.5, y: 0.8 }}
              gradientEnd={{ x: 1, y: 1 }}
              height={60}
              width={60}
              textStyle={{
                letterSpacing: 1,
                fontSize: 10,
                color: "white",
                fontWeight: "bold"
              }}
              states={{
                valid: {
                  text: "Pay",
                  backgroundColors: ["#4DC7A4", "#66D37A"],
                  //image: require('upload-image.png'),
                  onPress: () => swiper.current.snapTo({ index: 0 })
                },
                invalid: {
                  text: "   Pick\nAmount",
                  backgroundColors: ["#d9d9d9", "#e6e6e6"],
                  //image: require('upload-image.png'),
                  onPress: () => {}
                }
              }}
            />
          </Animated.View>
        </View>

        <Interactable.View
          ref={swiper}
          horizontalOnly={true}
          snapPoints={[{ x: 0, id: "closed" }, { x: -width + 50, id: "open" }]}
          onSnap={updateContainer}
          animatedValueX={_deltaX}
        >
          <View
            style={{
              left: 0,
              right: 0,
              height: 75,
              backgroundColor: "#f0f0f5",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={{ fontSize: 21, marginLeft: 10, fontWeight: "bold" }}>
              Donera pengar
            </Text>
            <TouchableWithoutFeedback
              style={{ marginRight: 25 }}
              onPress={() =>
                containerState === 0
                  ? swiper.current.snapTo({ index: 1 })
                  : swiper.current.snapTo({ index: 0 })
              }
            >
              <Icon name="chevron-right" size={35} color="gray" />
            </TouchableWithoutFeedback>
          </View>
        </Interactable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f5"
  },
  inputContainer: {
    width: width - 170,
    height: 65,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: 65,
    height: 65,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  }
});
export default SwipeOut;
