import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(message);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:9000/graphql" }),
]);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default apolloClient;
