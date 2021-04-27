import React from 'react';
import { Player } from '../components/Player';
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from '../styles/app.module.scss';
import { PayerContextProvider, usePlayer } from '../contexts/PlayerContexts';
import { ThemeProvider } from 'next-themes';


import '../styles/globals.scss';
import { Main } from '../components/Main';


function MyApp({ Component, pageProps }) {

  const {isOpenPlayer} = usePlayer();

  return (
    <ThemeProvider defaultTheme='light'>
      <PayerContextProvider>
        <div className={styles.wrapper}>
          <Main>
            <Component {...pageProps} />
          </Main>
          <Player />
        </div>
      </PayerContextProvider>
    </ThemeProvider>


  )
}

export default MyApp
