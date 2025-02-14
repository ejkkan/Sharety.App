import React from "react";
import { View } from "react-native";

const Shadow = props => (
  <View
    style={[
      props.type ? config[props.type] : config.medium,
      props.style ? { ...props.style } : {}
    ]}
  >
    {props.children}
  </View>
);

const config = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 12
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20
  }
};

export default Shadow;
