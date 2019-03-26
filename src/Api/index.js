import { Platform, AsyncStorage } from "react-native";
import gql from "graphql-tag";
import { createApolloFetch } from "apollo-fetch";
import Navigation from "../../src/utils/Navigation";
import { authMiddleware, requestMiddleware } from "./middlewares";

const uri =
  Platform.OS === "android"
    ? "http://10.0.2.2:4444/graphql"
    : "http://localhost:4444/graphql";

export const apolloFetch = createApolloFetch({ uri })
  .use(authMiddleware)
  .useAfter(requestMiddleware);

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`;

export const GET_CHARITIES = gql`
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

const SINGlE_ITEM_QUERY = gql`
  query SINGlE_ITEM_QUERY($id: ID!) {
    charity(where: { id: $id }) {
      id
      title
      description
      image
      largeImage
    }
  }
`;

const AUTO_SIGNIN = gql`
  query AUTO_SIGNIN {
    autoSignin {
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

const SUBSCRIBE_TO_CHARITY = gql`
  mutation SUBSCRIBE_TO_CHARITY($id: ID!, $quantity: Int!) {
    subscribe(id: $id, quantity: $quantity) {
      id
    }
  }
`;

const CREATE_PAYMENT_CARD_MUTATION = gql`
  mutation CREATE_PAYMENT_CARD_MUTATION($card_token: String!) {
    createPaymentCard(card_token: $card_token) {
      id
    }
  }
`;

export const Api = {
  login: async variables => {
    console.log("variables", variables);
    let response = await apolloFetch({ query: SIGNIN_MUTATION, variables });
    console.log("FROM SERVER", response.data.signin);
    return await AsyncStorage.setItem("token", response.data.signin);
  },
  autoSignin: async variables => {
    return await apolloFetch({ query: AUTO_SIGNIN, variables });
  },
  getCharities: async () => {
    return await apolloFetch({ query: GET_CHARITIES });
  },
  getCharity: async variables => {
    const response = await apolloFetch({ query: SINGlE_ITEM_QUERY, variables });
    console.log("response", response);
    return response.data.charity;
  },
  subscribe: async variables => {
    console.log("variables", variables);
    let response = await apolloFetch({
      query: SUBSCRIBE_TO_CHARITY,
      variables
    });
    console.log("response", response);
  },
  createPaymentCard: async variables => {
    let response = await apolloFetch({
      query: CREATE_PAYMENT_CARD_MUTATION,
      variables
    });
    console.log("response", response);
    return response;
  }
};
