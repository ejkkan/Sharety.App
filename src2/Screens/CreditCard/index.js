import React, { Component } from "react";
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

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const { width, height } = Dimensions.get("window");

const CREATE_PAYMENT_CARD_MUTATION = gql`
  mutation CREATE_PAYMENT_CARD_MUTATION($card_token: String!) {
    createPaymentCard(card_token: $card_token) {
      id
    }
  }
`;

const GET_USER_QUERY = gql`
  query GET_USER_QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export default class CreditCard extends Component {
  constructor() {
    super();
  }
  state = {
    card_token: ""
  };
  onChange = async (cardDetails, createPaymentCard) => {
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
      console.log("card", stripeResponse);
      console.log("token", stripeResponse.id);
      this.setState({ card_token: stripeResponse.id }, async () => {
        await createPaymentCard();
        this.props.navigation.navigate("App");
      });
    } catch (error) {}
  };
  render() {
    return (
      <Mutation
        mutation={CREATE_PAYMENT_CARD_MUTATION}
        variables={{
          card_token: this.state.card_token
        }}
        refetchQueries={[{ query: GET_USER_QUERY }]}
      >
        {(createPaymentCard, { loading }) => (
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("App")}
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
                    this.onChange(cardDetails, createPaymentCard)
                  }
                  inputContainerStyle={{
                    backgroundColor: "transparent",
                    width: 150
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Mutation>
    );
  }
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
