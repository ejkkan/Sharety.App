import { AsyncStorage } from "react-native";
import { withClientState } from "apollo-link-state";
import { ApolloConsumer } from "react-apollo";
import Navigation from "../../utils/Navigation";
import React from "react";

const Mutation = {
  login: (_, { token }, a) => {
    console.log("CLIENT", a);

    <ApolloConsumer>{client => console.log("client", client)}</ApolloConsumer>;
    AsyncStorage.setItem("token", token);
    Navigation.navigate("Main");
  },
  setFcmToken: async (_, { token }, { cache }) => {
    await AsyncStorage.setItem("fcmToken", token);
    let item = await AsyncStorage.getItem("fcmToken");
  },
  applySubscriptionsToCharities: (
    _,
    { charities, subscriptionItems },
    { cache }
  ) => {
    console.log("applySubscriptionsToCharities", charities, subscriptionItems);
  }
};

const localLink = cache =>
  withClientState({
    cache,
    resolvers: {
      Mutation: Mutation
    },
    defaults: {
      token: null
    }
  });

export { localLink };
