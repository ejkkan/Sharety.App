import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {Button} from 'react-native'


const SUBSCRIBE_TO_CHARITY = gql`
  mutation SUBSCRIBE_TO_CHARITY($charityId: ID!, $plan: Int!) {
    subscribe(charityId: $charityId, plan: $plan) {
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

class Subscribe extends React.Component {
    handleButtonClick = (subscribe, e) => {
        // console.log("hej", this.props.charge);
        // if (!this.props.charge) return;
        console.log('subscrbe click')
        subscribe();
    };
    render() {
        //const { id } = this.props;
        return (
            <Mutation
                mutation={SUBSCRIBE_TO_CHARITY}
                variables={{
                    charityId: "cjo5sliaz5m240a426x9mdgf4",
                    plan: 20
                }}
                refetchQueries={[{ query: GET_USER_QUERY }]}
            >
                {(subscribe, { loading }) => (
                    <Button
                    title="sub"
                        disabled={loading}
                        onPress={e => this.handleButtonClick(subscribe, e)}
                    >
                        SUBSCRIPE TO ME
          </Button>
                )}
            </Mutation>
        );
    }
}
export default Subscribe;
