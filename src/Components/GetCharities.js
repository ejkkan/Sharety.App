import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_CHARITIES = gql`
  query GET_CHARITIES {
    charities {
      id
      title
      description
      largeImage
    }
  }
`;

const GetCharities = props => (
  <Query {...props} query={GET_CHARITIES}>
    {payload => props.children[0](payload)}
  </Query>
);

export default GetCharities;
