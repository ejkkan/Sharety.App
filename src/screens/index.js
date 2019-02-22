import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
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

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, Observable } from 'apollo-link';
import { withClientState } from 'apollo-link-state';


import Navigation from '../utils/Navigation';


const httpLink = new HttpLink({
  uri: "http://localhost:4444/graphql",
  credentials: "include"
});

const uri =
  Platform.OS === "android"
    ? "http://10.0.2.2:4444/graphql"
    : "http://localhost:4444/graphql";


const request = async (operation) => {
  console.log('request', operation)
};

const requestLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    console.log('response', response)
    return response;
  });
});


const errorLink = onError(({ graphQLErrors, networkError }) => {
    Navigation.navigate("Login")
  console.log('graphQLErrors, networkError',graphQLErrors, networkError)
})

const cache = new InMemoryCache()

const localQueryLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      login: (_, {token} , { cache }) => {
        console.log('token');
        console.log('token', token)
        //AsyncStorage.setItem('token')
        Navigation.navigate('Main')
      }
    }
  },
  defaults: {
    token: "hej",
    hejsan: "ijf",
  }
})
const link = ApolloLink.from([localQueryLink, errorLink, requestLink, httpLink]);

const localClient = new ApolloClient({
  //uri,
  cache,
  link,
  // request: operation => {
  //   operation.setContext({
  //     fetchOptions: {
  //       credentials: "include"
  //     }
  //     //headers
  //   });
  // }
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

const TabNavigator = createStackNavigator(
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
    Splash: SplashStack ,
    Login:  LoginStack,
    Auth: TabNavigator
  },
  {
    initialRouteName: "Login",
    transitionConfig: () => fadeIn(700),
    headerMode: "none"
  }
);

export default createAppContainer(Root);
