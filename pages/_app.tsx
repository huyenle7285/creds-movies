import StoreProvider from '@/store/provider';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: NextPage) => page);
  // return getLayout(<Component {...pageProps} />);

  return <StoreProvider>{getLayout(<Component {...pageProps} />)}</StoreProvider>;
}
