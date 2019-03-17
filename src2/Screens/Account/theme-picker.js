import React, { Component } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
  Animated
} from "react-native";

import Shadow from "../../Components/Shadow";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");
import Interactable from "react-native-interactable";

const itemWidth = width / 3;

export default class UnlockButton extends Component<Props> {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }
  state = {
    width: width / 100
  };
  componentDidMount() {
    setTimeout(() => {
      this.interactableElem.snapTo({ index: 2 });
    }, 50);
  }
  defaultProps = {
    damping: 1 - 0.6,
    tension: 300
  };

  renderColorPick = (color, range) => {
    return (
      <Animated.View
        style={{
          height: 90,
          width: itemWidth,
          alignItems: "center",
          justifyContent: "center",
          transform: [
            {
              scale: this._deltaX.interpolate({
                inputRange: [-range[0], width / 2 - range[1], width - range[2]],
                outputRange: [1, 1.5, 1]
              })
            }
          ]
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: color
          }}
        />
      </Animated.View>
    );
  };

  render() {
    return (
      <Shadow type="small">
        <Interactable.View
          ref={el => (this.interactableElem = el)}
          horizontalOnly={true}
          snapPoints={[
            {
              x: width / 3
            },
            {
              x: 0
            },
            {
              x: -width / 3
            }
            // {
            //   x: (-width / 3) * 2
            // }
            // {
            //   x: (-width / 3) * 3
            // }

            // {
            //   x: -150,
            //   damping: 1 - this.props.damping,
            //   tension: this.props.tension
            // }
          ]}
          onSnap={() => {}}
          //   onDrag={this.onDrag}
          //   onStop={this.onStopMoving}
          //   dragToss={0.01}
          animatedValueX={this._deltaX}
        >
          <View
            style={{
              height: 150,
              flexDirection: "row",
              width: 1000
            }}
          >
            {this.renderColorPick("red", [0, 100, 200])}
            {this.renderColorPick("purple", [100, 200, 300])}
            {this.renderColorPick("orange", [200, 300, 360])}
          </View>
        </Interactable.View>
      </Shadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});
