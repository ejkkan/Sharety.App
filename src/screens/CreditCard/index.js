import React, { useState} from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import Navigation from "../../utils/Navigation";
import Stripe from "../../utils/stripe";
const stripe = new Stripe();

const { width, height } = Dimensions.get("window");

const CreditCard = props => {
  const [card_token, setCardToken] = useState("");
  const onChange = async (cardDetails, createPaymentCard) => {
    if (!cardDetails.valid) return;
    const { values } = cardDetails;
    try {
      const stripeResponse = await stripe.createToken(
        values.number,
        values.expiry.split("/")[0],
        values.expiry.split("/")[1],
        values.cvc
      );
      if (stripeResponse.errors) return;
      await createPaymentCard({card_token:stripeResponse.id});
      props.navigation.navigate("Startup");
    } catch (error) {}
  };
  
  return (
        <TouchableWithoutFeedback
          onPress={() => props.navigation.goBack()}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              flex: 1
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                height: 300
              }}
            >
              <CreditCardInput
                // cardScale={0.7}
                onChange={cardDetails =>
                  onChange(cardDetails, createPaymentCard)
                }
                inputContainerStyle={{
                  backgroundColor: "transparent",
                  width: 150
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      
  );
}


const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: 220,
    borderRadius: 8,
    marginTop: 20,
    elevation: 20
  }
});


export default CreditCard;