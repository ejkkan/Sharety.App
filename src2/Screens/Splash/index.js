import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import Auth from "../../Components/AuthCheck";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import Firebase from "../../utils/cloud-messaging";

const SET_FCM_TOKEN = gql`
  mutation SET_FCM_TOKEN($token: String!) {
    setFcmToken(token: $token) @client
  }
`;
const SEND_FCM_TOKEN = gql`
  mutation SEND_FCM_TOKEN($token: String!) {
    setFcmToken(token: $token)
  }
`;

const Composed = adopt({
  auth: <Auth />,
  localFirebase: ({ render }) => (
    <Mutation mutation={SET_FCM_TOKEN}>{render}</Mutation>
  ),
  remoteFirebase: ({ render }) => (
    <Mutation mutation={SEND_FCM_TOKEN}>{render}</Mutation>
  )
});

export default class Splash extends Component {
  componentDidMount() {
    Firebase.requestPermission();
    const setToken = token => {
      this.localFirebase({ variables: { token: token } });
      this.remoteFirebase({ variables: { token: token } });
    };
    Firebase.init(setToken);
  }

  render() {
    return (
      <Composed>
        {({ auth, localFirebase, remoteFirebase }) => {
          this.localFirebase = localFirebase;
          this.remoteFirebase = remoteFirebase;
          return (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  this.props.navigation.navigate("App");
                }}
              >
                <Text style={styles.buttonText}>SPLASH</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Composed>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4f2f8"
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
