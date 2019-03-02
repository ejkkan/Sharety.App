import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const SUBSCRIBE_TO_CHARITY = gql`
  mutation SUBSCRIBE_TO_CHARITY($id: ID!, $plan: Int!) {
    subscribe(id: $id, plan: $plan) {
      id
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

const GET_PLAN = gql`
  query GET_PLAN {
    plans {
      name
      amount
    }
  }
`;

class SubscribeButton extends React.Component {
  handleButtonClick = (subscribe, e) => {
    // console.log("hej", this.props.charge);
    // if (!this.props.charge) return;
    subscribe();
  };
  render() {
    const { charity } = this.props;

    return (
      <Mutation
        mutation={SUBSCRIBE_TO_CHARITY}
        variables={{
          id: charity.id,
          plan: 10
        }}
        refetchQueries={[{ query: GET_USER_QUERY }]}
      >
        {(subscribe, { loading }) => (
          <Query query={GET_PLAN}>
            {({ data, loading }) => (
              <TouchableOpacity
                onPress={e => this.handleButtonClick(subscribe, charity)}
              >
                <View style={styles.button}>
                  <Text>Subscribe!</Text>
                </View>
              </TouchableOpacity>
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SubscribeButton;
