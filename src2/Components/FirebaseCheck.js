import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGIN = gql`
  mutation LOGIN($token: String!) {
    login(token: $token) @client
  }
`;

// import { init } from "../utils/cloud-messaging";

export default class Page extends Component {
  componentDidMount() {}
  render() {
    return (
      <Mutation mutation={LOGIN}>
        {payload => this.props.children(payload)}
      </Mutation>
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
