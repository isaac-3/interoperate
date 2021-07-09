import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import ModalWrapper from '../components/modal/ModalWrapper';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
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
