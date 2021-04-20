import React from 'react';
import { PlayerControllers } from '../PlayerControllers';
import styles from './style.module.scss';

export function Player() {

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="player tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>selecione um podcast para ouvir</strong>
      </div>
      
      <footer>
        <PlayerControllers />
      </footer>
      
     
    </div>
  );
}