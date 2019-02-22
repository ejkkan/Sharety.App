import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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

const GetUser = props => (
  <Query {...props} query={GET_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

export default GetUser;
