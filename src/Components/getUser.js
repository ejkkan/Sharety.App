import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
//import PropTypes from "prop-types";

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
//pollInterval={10000}
const User = props => (
  <Query {...props} pollInterval={10000} query={GET_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

// User.propTypes = {
//   children: PropTypes.func.isRequired
// };

export default User;
