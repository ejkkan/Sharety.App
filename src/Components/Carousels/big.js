import React, { Component } from "react";
import { Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View } from "react-native";

import BigCard from "../Cards/big";

const { width } = Dimensions.get("window");

export default class MyCarousel extends Component {
  state = {
    height: 0,
    activeSlide: 0
  };
  _renderItem = ({ item, index }) => {
    console.log("item", item);
    return (
      <View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;

          this.setState({ height });
        }}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <BigCard charity={item} />
      </View>
    );
  };

  render() {
    if (!this.props.charities) return null;
    return (
      <View style={{ height: this.state.height + 30 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.charities}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          renderItem={this._renderItem}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.99}
          sliderWidth={width}
          itemWidth={width}
        />
        <Pagination
          dotsLength={this.props.charities.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{
            paddingVertical: 10
          }}
          dotColor={"gray"}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 8
          }}
          inactiveDotColor={"black"}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }
}
