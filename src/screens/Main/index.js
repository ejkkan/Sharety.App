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
import AuthCheck from '../../Components/AuthCheck'
//import RNMaterialShadows from "react-native-material-shadows";
import Subscribe from '../../Components/sub-button'

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

const CHARITIES_QUERY = gql`
  query CHARITIES_QUERY {
    charities {
      id
      title
      description
      largeImage
    }
  }
`;


export default class Page extends Component<Props> {
  render() {
    return (
      <Query
        query={CHARITIES_QUERY}
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
              <Text style={styles.welcome}>{data.charities[1].title}</Text>
              <Subscribe id={data.charities[0].id}/>
            </View>
          );
        }}
      </Query>
    );
  }
}
{/* <RNMaterialShadows
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
              </RNMaterialShadows> */}

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
