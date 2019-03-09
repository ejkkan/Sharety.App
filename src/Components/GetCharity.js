import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { View } from "react-native";

const SINGlE_ITEM_QUERY = gql`
  query SINGlE_ITEM_QUERY($id: ID!) {
    charity(where: { id: $id }) {
      id
      title
      description
      image
      largeImage
    }
  }
`;
const GetCharities = props => (
  <Query
    {...props}
    variables={{
      id: props.id
    }}
    query={SINGlE_ITEM_QUERY}
  >
    {payload => (
      <View
        style={{
          backgroundColor: "transparent"
        }}
      >
        {props.children(payload)}
      </View>
    )}
  </Query>
);

export default GetCharities;
