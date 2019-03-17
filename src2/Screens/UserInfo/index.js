import React from "react";
import { View, StyleSheet } from "react-native";

import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

export default class LineChartExample extends React.Component {
  render() {
    const data = [0, 9, 2, 1, 6, 1, 1, 2, 1, 1, 1, 2, 0, 0];

    return (
      <View style={styles.container}>
        <LineChart
          style={{ height: 200, marginTop: 100, marginHorizontal: 20 }}
          data={data}
          animate={true}
          animationDuration={1000}
          curve={shape.curveCatmullRomOpen}
          svg={{ stroke: "rgb(134, 65, 244)", strokeWidth: "3" }}
          contentInset={{ top: 20, bottom: 20 }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4f2f8"
  }
});
