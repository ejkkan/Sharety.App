import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const SUBSCRIBE_TO_CHARITY = gql`
  mutation SUBSCRIBE_TO_CHARITY($id: ID!, $charge: Int!, $interval: Int!) {
    subscribe(id: $id, charge: $charge, interval: $interval) {
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

class SubscribeLineButton extends React.Component {
  handleButtonClick = (subscribe, e) => {
    console.log("hej", this.props.charge);
    if (!this.props.charge) return;
    subscribe(e);
  };
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={SUBSCRIBE_TO_CHARITY}
        variables={{
          id,
          charge: this.props.charge,
          interval: 30
        }}
        refetchQueries={[{ query: GET_USER_QUERY }]}
      >
        {(subscribe, { loading }) => (
          <TouchableOpacity onClick={e => this.handleButtonClick(subscribe, e)}>
            <View style={styles.button}>
              <Text>Donate!</Text>
            </View>
          </TouchableOpacity>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    margin: 20,
    paddingHorizontal: 30,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SubscribeLineButton;
