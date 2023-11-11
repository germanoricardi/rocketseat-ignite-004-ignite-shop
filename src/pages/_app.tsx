import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import { Container } from '../styles/pages/app'

import { CartContextProvider } from '@/contexts/CartContext';
import { ToastContainer } from 'react-toastify';
import { Header } from '@/components';

import 'react-toastify/dist/ReactToastify.css';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Container>
      <CartContextProvider>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
