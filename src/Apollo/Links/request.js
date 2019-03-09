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
        Navigation.navigate("Tabs");
      }
      if (response.data.charities && response.data.subscriptionItems) {
        console.log("is HERE");
        const formatted = response.data.charities.map(charity => {
          return {
            ...charity,
            subscribing: !!response.data.subscriptionItems.find(
              item => item.charity.id === charity.id
            )
          };
        });

        const newState = {
          data: {
            subscriptionItems: response.data.subscriptionItems,
            charities: formatted
          }
        };
        console.log("response", response);
        console.log("newState", newState);
        console.log("newState");
        return newState;
      }
    }
    return response;
  });
});

export { requestLink };
