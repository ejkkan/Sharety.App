import React from "react";
import RNMaterialShadows from 'react-native-material-shadows';

const Shadow = props => (
    <RNMaterialShadows style={props.type ? config[props.type] : config.medium} padding={30}>
        {props.children}
    </RNMaterialShadows>
);

const config = {
    small: {
       elevation:5
    },
    medium: {
        elevation: 5
    },
    large: {
        elevation: 5
    },

}

// shadowOffsetX: PropTypes.number,
// shadowOffsetY: PropTypes.number,
// shadowAlpha: PropTypes.number,
// calculateAsync: PropTypes.bool,
// showWhenAllReady: PropTypes.bool,
// animateShadow: PropTypes.bool,
// animationDuration: PropTypes.number,
// padding: PropTypes.number

export default Shadow;
