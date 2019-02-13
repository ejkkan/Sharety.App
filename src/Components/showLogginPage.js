import { Query } from "react-apollo";
import Signin from "./Signin";

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

const PleaseSignIn = props => (
  <Query query={CURRENT_LOCAL_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <View>
            <p>Please Sign In before Continuing</p>
          </View>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;
