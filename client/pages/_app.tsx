import '../styles/styles.scss';
import { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import store from '../store';
import ModalWrapper from '../components/modal/ModalWrapper';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../apolloClient';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { GET_USER } from '../lib/GraphQL/Queries';
import { updateUser } from '../lib/slices/userSlice';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <title>Interoperate</title>
        <ComponentWrapper Component={Component} pageProps={pageProps} />
      </Provider>
    </ApolloProvider>
  );
};

// @ts-ignore
const ComponentWrapper = ({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const urlPath = router.asPath.split("/")[1];

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await apolloClient.query({
        query: GET_USER,
      });

      if (data["getUser"]["__typename"] === "User") {
        dispatch(updateUser(data["getUser"]));
      } else if (data["getUser"]["__typename"] === "Error") {
        dispatch(updateUser({ id: 0, username: "" }));
      } else {
        // router.push("/");
      }
    };

    getUserData();
  }, []);

  return (
    <ModalWrapper>
      <Component {...pageProps} />
    </ModalWrapper>
  );
};
export default MyApp;
