import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  KeyboardAvoidingView
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import Stripe from "../../utils/stripe";
import ButtonComponent from "react-native-button-component";
import { Api } from "../../Api";
import Navigation from "../../utils/Navigation";

const stripe = new Stripe();

const { width, height } = Dimensions.get("window");

const PriceInput = props => {
  const [subPrice, setSubPrice] = useState("50");
  const [donatePrice, setDonatePrice] = useState("50");
  const [paymentType, setPaymentType] = useState("donate");
  const [buttonState, setButtonState] = useState("upload");

  // const onSubmit = async props => {
  //   Api.subscribe({ id: props.id, quantity: price });
  // };
  console.log("props", props);
  const updatePrice = (price, type) => {
    setPaymentType(type);
    if (paymentType === "subscribe") {
      setDonatePrice("0");
      return setSubPrice(price);
    }
    setSubPrice("0");
    return setDonatePrice(price);
  };

  const submit = async () => {
    setButtonState("uploading");

    const id = props.navigation.getParam("charity", { id: "" }).id;
    await Api.subscribe({ id, quantity: subPrice });
    setButtonState("upload");
    // if (paymentType === "subscribe") {

    //   return;
    // }
    //Donate
  };
  return (
    <TouchableWithoutFeedback
      style={{
        zIndex: 0,
        flex: 1
      }}
      onPress={() => props.navigation.goBack()}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
          flex: 1,
          zIndex: 1
        }}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                width: width - 40,
                justifyContent: "space-between",
                zIndex: 1000,
                paddingVertical: 40
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "300",
                  marginHorizontal: 20
                }}
              >
                Skänk en summa till välgörenhet
              </Text>
              <TextInput
                value={donatePrice}
                style={{
                  height: 40,
                  borderColor: "white",
                  fontSize: 50,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginVertical: 30,
                  opacity: paymentType === "subscribe" ? 0.3 : 1
                }}
                placeholder={"100"}
                onChangeText={price => updatePrice(price, "donate")}
                keyboardType="number-pad"
              />
              <View
                style={{
                  alignSelf: "stretch",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <View
                  style={{ borderWidth: 1, borderColor: "grey", flexGrow: 1 }}
                />
                <Text style={{ marginHorizontal: 20 }}>ELLER</Text>
                <View
                  style={{ borderWidth: 1, borderColor: "grey", flexGrow: 1 }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "300",
                  marginHorizontal: 20,
                  marginTop: 20,
                  opacity: paymentType === "subscribe" ? 1 : 0.3
                }}
              >
                Skänk en summa till välgörenhet
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                månadsvis
              </Text>
              <TextInput
                value={subPrice}
                style={{
                  height: 40,
                  borderColor: "white",
                  fontSize: 50,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginVertical: 30
                }}
                placeholder={"25"}
                onChangeText={price => updatePrice(price, "subscribe")}
                keyboardType="number-pad"
              />
              <ButtonComponent
                buttonState={buttonState} // "upload" or "uploading"
                gradientStart={{ x: 0.5, y: 0.8 }}
                gradientEnd={{ x: 1, y: 1 }}
                states={{
                  upload: {
                    text:
                      paymentType === "donate"
                        ? "Donate once"
                        : "Subscribe monthly",
                    backgroundColors: ["#4DC7A4", "#66D37A"],
                    //image: require('upload-image.png'),
                    onPress: () => submit()
                  },
                  uploading: {
                    text: "Loading...",
                    gradientStart: { x: 0.5, y: 0.8 },
                    gradientEnd: { x: 1, y: 1 },
                    backgroundColors: ["#ff4949", "#fe3030"],
                    spinner: true
                    // onPress: () => submit()
                  }
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: 220,
    borderRadius: 8,
    marginTop: 20,
    elevation: 20
  }
});

export default PriceInput;
