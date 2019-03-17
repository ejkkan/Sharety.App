import { counterStore, apolloFetch } from ".";

// import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

export const query = gql`
  query GET_CHARITIES {
    charities {
      id
      title
      description
      largeImage
    }
    subscriptionItems {
      id
      charity {
        id
      }
    }
  }
`;
export const asyncTest = async action => {
  //   const [state, dispatch] = useStore("counterStore");
  let hej = await apolloFetch({ query }); //all apolloFetch arguments are optional

  console.log("hej", hej);
  return counterStore.dispatch({ ...action, payload: hej.status });
};
