import React, { useState} from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import Navigation from "../../utils/Navigation";
import Stripe from "../../utils/stripe";

const stripe = new Stripe();

const { width, height } = Dimensions.get("window");

const PriceInput = props => {
  
  const [price, setPrice] = useState(50);
  const onSubmit = async (cardDetails, createPaymentCard) => {
   
  };
  
  return (
        <TouchableWithoutFeedback
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
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
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                height: width-20,
                width:width-20,
                
              }}
            >
              <TextInput
                style={{height: 40, borderColor:'white', fontSize:50, fontWeight:"bold",textAlign:'center'}}
                placeholder={"100kr"}
                onChangeText={(price) => setPrice(price)}
                keyboardType="number-pad"
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


export default PriceInput;