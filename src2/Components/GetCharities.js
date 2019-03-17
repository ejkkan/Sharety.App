import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

export const GET_CHARITIES = gql`
  query GET_CHARITIES {
    charities {
      id
      title
      description
      largeImage
    }
    subscriptionItems {
      id
      charity {
        id
      }
    }
  }
`;

const UPDATE_LOCAL_CHARITIES = gql`
  mutation UPDATE_LOCAL_CHARITIES($token: String!) {
    applySubscriptionsToCharities(
      charities: $charities
      subscriptionItems: $subscriptionItems
    ) @client
  }
`;

const GetCharities = props => (
  <Query {...props} query={GET_CHARITIES}>
    {payload => props.children(payload)}
  </Query>
);

export default GetCharities;
