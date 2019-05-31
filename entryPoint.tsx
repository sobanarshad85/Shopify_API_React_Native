
import App from './src/modules/navigators'
//import liraries
import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { withClientState } from 'apollo-link-state'
import { any } from 'prop-types';

const cache = new InMemoryCache()
const stateLink = withClientState({
    cache,
    defaults: {
        testing: {
            __typename: 'testing',
            name: '',
            age: 0
        }
    }
})

const client = new ApolloClient({
    cache,


    link: ApolloLink.from([

        stateLink,
        new HttpLink({
            uri: 'https://testkwanso.myshopify.com/admin/api/graphql.json',
            headers: {
                'X-Shopify-Access-Token': 'd00ed612010adda003a365e62e8b87c6',
                'Content-Type': 'application/json'
            },
        }),
    ])
})

// create a component
class EntryPoint extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
    }
}

//make this component available to the app
export default EntryPoint;
