import '../styles/styles.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <title>Interoperate</title>
      <Component {...pageProps} />
    </div>
  )
}
export default MyApp
