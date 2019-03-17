import React, { Component } from "react";
import { Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View } from "react-native";

import BigCard from "../Cards/big";
import Mixed from "../Cards/mixed";

const { width } = Dimensions.get("window");

export default class MyCarousel extends Component {
  state = {
    height: 0,
    activeSlide: 0
  };

  _renderItem = ({ item, index }) => {
    if (!item) return;
    if (item.length === 0) return null;
    if (this.props.type === "mixed") {
      return (
        <View
          onLayout={event => {
            const { height } = event.nativeEvent.layout;

            this.setState({ height });
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Mixed charities={item} />
        </View>
      );
    }
    return (
      <View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          this.setState({ height });
        }}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <BigCard navigation={this.props.navigation} charity={item} />
      </View>
    );
  };

  render() {
    if (!this.props.charities) return null;
    const data = this.getData();
    return (
      <View style={{ height: this.state.height + 30 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={data}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          renderItem={this._renderItem}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.99}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
    );
  }
  getBatchedItems = (batchAmount, index, items) => {
    const offset = index + 1;
    const calc = offset * batchAmount;
    const last = calc - 1;
    const first = calc - batchAmount;

    return items.filter((item, i) => {
      return i <= last && i >= first;
    });
  };

  getData = () => {
    const { type, charities } = this.props;
    if (type === "mixed") {
      let arr = [];
      charities.forEach((x, i) => {
        const batch = this.getBatchedItems(3, i, charities);
        if (batch.length > 0) arr.push(batch);
      });
      return arr;
    }
    return charities;
  };
}

{
  /* <Pagination
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
        /> */
}
