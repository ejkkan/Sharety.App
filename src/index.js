import React from "react";

import AppNavigator from "./Screens";
import Navigation from "./utils/Navigation";

 const App = () => (
    <AppNavigator
        ref={navigatorRef => {
            Navigation.setTopLevelNavigator(navigatorRef);
        }}
    />
);

export default App;