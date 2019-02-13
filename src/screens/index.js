import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import {
  AsyncStorage,
  Animated,
  Easing,
  Dimensions,
  Platform
} from "react-native";
import { fromBottom, fadeOut, fadeIn } from "react-navigation-transitions";
const { width } = Dimensions.get("window");
import Main from "./Main";
import Login from "./Login";
import Splash from "./Splash";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4444/graphql",
  credentials: "include"
});

const uri =
  Platform.OS === "android"
    ? "http://10.0.2.2:4444/graphql"
    : "http://localhost:4444/graphql";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  console.log("AUTHLINK", token.cache.store);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new InMemoryCache();

const localClient = new ApolloClient({
  uri,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
      //headers
    });
  }
});

const withProvider = (Component, client = localClient) => {
  return class extends React.Component {
    static options = Component.options;

    render() {
      return (
        <ApolloProvider client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
};

const AuthStack = createDrawerNavigator(
  {
    Main: { screen: withProvider(Main) }
  },
  {
    //initialRouteName: "Splash",
    overlayColor: "transparent",
    transitionConfig: () => fromBottom(1000),
    headerMode: "none",
    drawerType: "slide",
    gesturesEnabled: true,
    useNativeAnimations: true,
    drawerWidth: width / 2,
    contentOptions: {
      itemsContainerStyle: {
        marginVertical: 150
      }
    }
  }
);

const LoginStack = createStackNavigator(
  {
    Login: { screen: withProvider(Login) }
    //Main: { screen: withProvider(Main) }
  },
  {
    //initialRouteName: "Splash",
    gesturesEnabled: true,
    transitionConfig: () => fadeIn(700)
  }
);

const SplashStack = createStackNavigator(
  {
    Splash: { screen: withProvider(Splash) }
  },
  {
    headerMode: "none",
    transitionConfig: () => fromBottom(700)
  }
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    Main: AuthStack,
    Splash: SplashStack
  },
  {
    headerMode: "none",
    swipeEnabled: true,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom"
  }
);
const Root = createStackNavigator(
  {
    Splash: { screen: SplashStack },
    Login: { screen: LoginStack },
    Auth: { screen: TabNavigator }
  },
  {
    initialRouteName: "Splash",
    transitionConfig: () => fadeIn(700),
    headerMode: "none"
  }
);

export default createAppContainer(Root);
