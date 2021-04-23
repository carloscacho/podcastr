import '../styles/globals.scss';

import React from 'react';
import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';
import { PayerContextProvider } from '../contexts/PlayerContexts';


function MyApp({ Component, pageProps }) {

  return (
    <PayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PayerContextProvider>

  )
}

export default MyApp
