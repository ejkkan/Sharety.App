import React from "react";
import RNMaterialShadows from "react-native-material-shadows";
import { View } from "react-native";

const Shadow = props => (
  <RNMaterialShadows
    style={props.style ? { ...props.style } : {}}
    shadowOffsetY={-15}
    shadowOffsetY={30}
    shadowAlpha={20}
    calculateAsync={false}
    showWhenAllReady={false}
    animateShadow={false}
    animationDuration={0}
    padding={0}
  >
    {props.children}
  </RNMaterialShadows>
);

const elevation = {
  small: { elevation: 5 },
  medium: { elevation: 17 },
  large: { elevation: 25 }
};

const config = {
  small: {
    elevation: 5,
    shadowOffsetX: -30,
    shadowOffsetY: 30,
    shadowAlpha: 20
  },
  medium: {
    elevation: 15,
    shadowOffsetX: ["left"],
    shadowOffsetY: 50,
    shadowAlpha: 50
  },
  large: {
    elevation: 5
  }
};

// shadowOffsetX: PropTypes.number,
// shadowOffsetY: PropTypes.number,
// shadowAlpha: PropTypes.number,
// calculateAsync: PropTypes.bool,
// showWhenAllReady: PropTypes.bool,
// animateShadow: PropTypes.bool,
// animationDuration: PropTypes.number,
// padding: PropTypes.number

export default Shadow;
