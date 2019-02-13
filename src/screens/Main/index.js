import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import RNMaterialShadows from "react-native-material-shadows";

const SINGLE_CHARITY_QUERY = gql`
  query SINGLE_CHARITY_QUERY($id: ID!) {
    charity(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const GET_USER_QUERY = gql`
  query GET_USER_QUERY {
    me {
      id
    }
  }
`;

export default class Page extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const screenNumber = navigation.state.params
      ? navigation.state.params.screenNumber
      : 0;
    const headerColor = headerColors[screenNumber % headerColors.length];
    return {
      title: `I am screen ${screenNumber}`,
      headerStyle: {
        backgroundColor: headerColor,
        height: 85
      },
      headerTitleStyle: {
        color: "white"
      }
    };
  };
  render() {
    return (
      <Query
        query={SINGLE_CHARITY_QUERY}
        //pollInterval={5000}
        refetchQueries={[{ query: GET_USER_QUERY }]}
        variables={{
          id: "cjo5sliaz5m240a426x9mdgf4"
        }}
      >
        {({ data, loading, error, client }) => {
          console.log("data, loading, error", data, loading, error);
          if (loading)
            return (
              <View style={styles.container}>
                <Text style={styles.welcome}>Loading...</Text>
              </View>
            );
          return (
            <View style={styles.container}>
              <Text style={styles.welcome}>{data.charity.title}</Text>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <RNMaterialShadows
                shadowOffsetX={14}
                shadowOffsetY={10}
                shadowAlpha={40}
                style={{ width: 150, height: 50 }}
                padding={10}
              >
                <Image
                  source={
                    "https://images.all-free-download.com/images/graphiclarge/nice_flowers_201855.jpg"
                  }
                  elevation={5}
                  style={styles.image}
                />
              </RNMaterialShadows>
            </View>
          );
        }}
      </Query>
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
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    width: 150
  }
});
