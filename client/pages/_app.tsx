import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import ModalWrapper from '../components/modal/ModalWrapper';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <title>Interoperate</title>
        <ModalWrapper>
          <Component {...pageProps} />
        </ModalWrapper>
      </Provider>
    </ApolloProvider>
  );
}
export default MyApp;
