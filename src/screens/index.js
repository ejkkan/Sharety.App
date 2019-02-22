import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import Main from "./Main";
import Login from "./Login";
import Splash from "./Splash";
import Account from "./Account";

import Apollo from '../Apollo'
import { fromBottom, fadeIn, fadeOut } from "react-navigation-transitions";

const MainStack = createStackNavigator(
  {
    Main: { screen: Apollo.withProvider(Main) }
  },
  {
    transitionConfig: () => fromBottom(1000),
    headerMode: "none",
    // drawerType: "slide",
    // gesturesEnabled: true,
    // overlayColor: "transparent",
    // useNativeAnimations: true,
    // drawerWidth: width / 2,
    // contentOptions: {
    //   itemsContainerStyle: {
    //     marginVertical: 150
    //   }
    // }
  }
);

const LoginStack = createStackNavigator(
  {
    Login: { screen: Apollo.withProvider(Login) }
  },
  {
    gesturesEnabled: false,
    transitionConfig: () => fadeIn(700)
  }
);

const SplashStack = createStackNavigator(
  {
    Splash: { screen: Apollo.withProvider(Splash) }
  },
  {
    headerMode: "none",
    transitionConfig: () => fadeIn(700)
  }
);

const AccountStack = createStackNavigator(
  {
    Account: { screen: Apollo.withProvider(Account) }
  },
  {
    headerMode: "none",
    transitionConfig: () => fadeIn(700)
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Main: MainStack,
    Account: AccountStack
  },
  {
    headerMode: "none",
    animationEnabled: true,
    tabBarPosition: "bottom"
  }
);

const Root = createSwitchNavigator(
  {
    Splash: SplashStack ,
    Login:  LoginStack,
    App: TabNavigator
  },
  {
    initialRouteName: "Splash",
    transitionConfig: () => fadeIn(700),
    headerMode: "none"
  }
);

export default createAppContainer(Root);
