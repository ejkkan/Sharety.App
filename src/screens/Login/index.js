import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { Api } from "../../Api";
import { actions } from "../../Reducers/counter";

// import initStore from "../../Reducers/counter";
//initStore();

export default class Login extends Component {
  state = {
    password: "",
    email: ""
  };

  saveToState = (key, value) => {
    this.setState({ [key]: value });
  };

  login = async () => {
    let done = await Api.login(this.state);
    // let charities = await Api.getCharities();
    //console.log("charities", charities);
    actions.getData();
  };

  render() {
    return (
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

        <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
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
