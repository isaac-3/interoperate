import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import ModalWrapper from '../components/modal/ModalWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <title>Interoperate</title>
      <ModalWrapper>
        <Component {...pageProps} />
      </ModalWrapper>
    </Provider>
  )
}
export default MyApp
