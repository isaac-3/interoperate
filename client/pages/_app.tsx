import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <title>Interoperate</title>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
