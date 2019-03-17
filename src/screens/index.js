import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Main from "./Main";
import Login from "./Login";
import Splash from "./Splash";
// import Onboarding from "./Onboarding";
import CreditCard from "./CreditCard";
import PriceInput from "./PriceInput";
import Charity from "./Charity";
import { fromBottom, fadeIn } from "react-navigation-transitions";

const App = createStackNavigator(
  {
    Main: { screen: Main },
    Charity: {screen: Charity}
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

const LoginStack = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    gesturesEnabled: false,
    transitionConfig: () => fadeIn(700)
  }
);

const SplashStack = createStackNavigator(
  {
    Splash: { screen: Splash }
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

export const PriceStack = createStackNavigator(
  {
    PriceInput: {
      screen: PriceInput
    }
  },
  {
    headerMode: "none",
    transitionConfig: () => fadeIn(700)
  }
);


const Startup = createSwitchNavigator(
  {
    Splash: SplashStack,
    // Onboarding: Onboarding,
    Login: LoginStack,
    App:App
  },
  {
    initialRouteName: "Splash",
    transitionConfig: () => fadeIn(700),
    headerMode: "none"
  }
);

const GlobalRoot = createStackNavigator(
  {
    Startup: Startup,
    CreditCard: CreditCard,
    PriceInput: PriceInput,
    Login: LoginStack,
  },
  {
    initialRouteName: "Startup",
    transitionConfig: () => fadeIn(700),
    headerMode: "none",
    transparentCard: true
  }
);

export default createAppContainer(GlobalRoot);
