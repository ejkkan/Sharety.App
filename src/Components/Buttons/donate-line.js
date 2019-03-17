import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Api } from '../../Api';

const SubscribeLineButton = ({onCallback, text}) => {
  return (
        <TouchableOpacity onPress={onCallback}>
          <View style={styles.button}>
            <Text
              style={{
                color: "rgba(0,0,0,0.7)",
                fontSize: 20
              }}
            >
              {text}
            </Text>
          </View>
        </TouchableOpacity>
  );
  
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    height: 55,
    paddingHorizontal: 40,
    margin: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.5)",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SubscribeLineButton;
