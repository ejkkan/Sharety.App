/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`;

const LOGIN = gql`
  mutation LOGIN($token: String!) {
    login(token: $token) @client
  }
`;

const GET_USER_QUERY = gql`
  query GET_USER_QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export default class Login extends Component {
  state = {
    password: "",
    email: ""
  };
  
  saveToState = (key, value) => {
    this.setState({ [key]: value });
  };

  login = async (signin, login) => {
    let hej = await signin();
    login({ variables:{token: hej.data.signin}});
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: GET_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
        <Mutation
            mutation={LOGIN}
        >
        {(login, { error, loading }) => (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={text => this.saveToState("email", text)}
              returnKeyType="next"
              placeholder="Email or Mobile Num"
              placeholderTextColor="rgba(225,225,225,0.7)"
            />

            <TextInput
              style={styles.input}
              returnKeyType="go"
              ref={input => (this.passwordInput = input)}
              placeholder="Password"
              onChangeText={text => this.saveToState("password", text)}
              placeholderTextColor="rgba(225,225,225,0.7)"
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.buttonContainer}
                  onPress={() => this.login(signin, login)}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        )}
        </Mutation>
        )}
      </Mutation>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "black"
  },
  buttonContainer: {
    backgroundColor: "blue",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});
