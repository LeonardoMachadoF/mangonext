import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from '../src/contexts/colorContext/context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
