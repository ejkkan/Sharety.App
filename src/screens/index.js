import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import { View, TouchableOpacity } from "react-native";

import Main from "./Main";
import Login from "./Login";
import Splash from "./Splash";
import Account from "./Account";
import CreditCard from "./CreditCard";
import UserInfo from "./UserInfo";
import Charity from "./Charity";

import TabBar from "../Components/TabBar";

import Apollo from "../Apollo";
import { fromBottom, fadeIn, fadeOut } from "react-navigation-transitions";

const MainStack = createStackNavigator(
  {
    Main: { screen: Apollo.withProvider(Main) },
    Charity: Apollo.withProvider(Charity)
  },
  {
    transitionConfig: () => fromBottom(700),
    headerMode: "none",

    transparentCard: true
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

export const CharityStack = createStackNavigator(
  {
    CreditCard: {
      screen: Apollo.withProvider(Charity)
    }
  },
  {
    transparentCard: true,
    mode: "modal",
    headerMode: "none",
    transitionConfig: () => fromBottom(700),
    navigationOptions: {
      tabBarVisible: false
    }
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

const UserInfoStack = createStackNavigator(
  {
    UserInfo: { screen: Apollo.withProvider(UserInfo) }
  },
  {
    headerMode: "none",
    transitionConfig: () => fadeIn(700)
  }
);

export const CreditCardStack = createStackNavigator(
  {
    CreditCard: {
      screen: CreditCard
    }
  },
  {
    headerMode: "none",
    transitionConfig: () => fadeIn(700)
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Main: MainStack,
    UserInfo: UserInfoStack,
    Account: AccountStack
  },
  {
    headerMode: "none",
    animationEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      inactiveBackgroundColor: "red",
      activeBackgroundColor: "red",
      showIcon: true,
      showLabel: false,
      lazyLoad: true,
      style: {
        backgroundColor: "transparent",
        borderTopWidth: 0,
        position: "absolute",
        left: 50,
        right: 50,
        bottom: 20,
        height: 100
      }
    },
    tabBarComponent: props => <TabBar {...props} />,
    transitionConfig: () => fadeIn(700)
  }
);

const App = createSwitchNavigator(
  {
    Splash: SplashStack,
    Login: LoginStack,
    Tabs: TabNavigator
  },
  {
    initialRouteName: "Splash",
    transitionConfig: () => fadeIn(700),
    headerMode: "none"
  }
);

const Root = createStackNavigator(
  {
    App: App,
    CreditCard: Apollo.withProvider(CreditCard)
  },
  {
    initialRouteName: "App",
    transitionConfig: () => fadeIn(700),
    headerMode: "none",
    transparentCard: true
  }
);

export default createAppContainer(Root);
