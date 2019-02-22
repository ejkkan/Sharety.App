import React from "react";
import {
    Platform
} from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import Links from './Links'

const uri =
    Platform.OS === "android"
        ? "http://10.0.2.2:4444/graphql"
        : "http://localhost:4444/graphql";


const httpLink = new HttpLink({
    uri,
    credentials: "include"
});

const link = ApolloLink.from([
    Links.localLink(cache),
    Links.errorLink,
    Links.authLink,
    Links.requestLink,
    httpLink
]);
const cache = new InMemoryCache();
const client = new ApolloClient({
    link,
    cache
});

const withProvider = (Component) => {
    return class extends React.Component {
        static options = Component.options;

        render() {
            return (
                <ApolloProvider client={client}>
                    <Component {...this.props} />
                </ApolloProvider>
            );
        }
    };
};


export default {
    client,
    withProvider
}