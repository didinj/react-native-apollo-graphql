import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-graphql-api.com/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;