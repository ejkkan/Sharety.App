import { AsyncStorage } from "react-native";
import { withClientState } from "apollo-link-state";

import Navigation from "../../utils/Navigation";

const Mutation = {
  login: (_, { token }, { cache }) => {
    AsyncStorage.setItem("token", token);
    Navigation.navigate("Main");
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
