/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import GetUser from "../../Components/getUser";

type Props = {};
export default class Page extends Component<Props> {
  render() {
    return (
      <GetUser>
        {({ data, loading, error }) => {
          if (loading)
            return (
              <View style={styles.container}>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    this.props.navigation.navigate("MAIN");
                  }}
                >
                  <Text style={styles.buttonText}>SPLASH</Text>
                </TouchableOpacity>
              </View>
            );
          //if (!data.me) return this.props.navigation.navigate("Login");
          //return this.props.navigation.navigate("Auth");
        }}
      </GetUser>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
