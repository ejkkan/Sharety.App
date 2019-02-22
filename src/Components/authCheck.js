import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Login from "../screens/Login";
import { Text } from 'react-native';

const CURRENT_LOCAL_USER_QUERY = gql`
  query CURRENT_LOCAL_USER_QUERY @client {
    me {
      id
      email
      name
      permissions
    }
  }
`;
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
//p
const PleaseSignIn = props => (
  <Query query={GET_USER_QUERY}>
        {({ data, loading }) => {
          console.log('AUTHY')
            if (loading) return <Text>Loading...</Text>;
            if (!data.me) {
                return (
                    <View>
                        <p>Please Sign In before Continuing</p>
                        <Login />>
          </View>
                );
            }
            return props.children;
        }}
    </Query>
);

export default PleaseSignIn;
