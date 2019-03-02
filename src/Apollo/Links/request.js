import { AsyncStorage } from "react-native";
import { ApolloLink } from "apollo-link";

import Navigation from "../../utils/Navigation";

const requestLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    __DEV__ && console.log("[GRAPHQL RESPONSE]: ", response);
    if (response.errors) {
      if (response.errors[0].path[0] === "autoSignin") {
        AsyncStorage.removeItem("token");
        Navigation.navigate("Login");
      }
      if (
        response.errors[0].path[0] === "subscribe" &&
        response.errors[0].message === "Add credit card"
      ) {
        Navigation.navigate("CreditCard");
      }
    }
    if (response.data) {
      if (response.data.autoSignin) {
        Navigation.navigate("App");
      }
    }
    return response;
  });
});

export { requestLink };
