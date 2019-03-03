import React from "react";
import { Query, Subscription } from "react-apollo";
import gql from "graphql-tag";

const GET_SUBSCRIPTION_ITEMS_QUERY = gql`
  query GET_SUBSCRIPTION_ITEMS_QUERY {
    subscriptionItems($id: ID!) {
      id
      charity
    }
  }
`;

const GetSubscriptionItems = props => (
  <Query
    {...props}
    variables={{ id: props.id }}
    query={GET_SUBSCRIPTION_ITEMS_QUERY}
  >
    {payload => props.children(payload)}
  </Query>
);

export default GetSubscriptionItems;
