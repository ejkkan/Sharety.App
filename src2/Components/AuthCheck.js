import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const AUTO_SIGNIN = gql`
  query AUTO_SIGNIN {
    autoSignin {
      id
    }
  }
`;

const Auth = props => (
  <Query {...props} query={AUTO_SIGNIN}>
    {payload => props.children(payload)}
  </Query>
);

export default Auth;
