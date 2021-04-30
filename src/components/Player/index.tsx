import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { usePlayer } from '../../contexts/PlayerContexts';
import useWindowDimensions from '../../utils/WindowDimensions';
import { PlayerControllers } from '../PlayerControllers';
import styles from './style.module.scss';

export function Player() {

  const {
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay,
    setPlayingState,
    playNext,
    playPrev,
    hasNextEpisode,
    hasPrevEpisode,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    clearPlayerState,
    isOpenPlayer,
    closePlayer
  } = usePlayer();

  const {width} = useWindowDimensions()
  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={`${styles.playerContainer} ${isOpenPlayer ? styles.openPlayer: styles.closePlayer}`}>
      {width < 720 && <a className={styles.closeBtn} onClick={() => closePlayer()}>×</a>}
      <header>
        <img src="/playing.svg" alt="player tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt={episode.title}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
        ) : (
        <div className={styles.emptyPlayer}>
          <strong>selecione um podcast para ouvir</strong>
        </div>
      )}
      
      <footer className={!episode ? styles.empty : ''}>
        <PlayerControllers 
          episode={episode}
          episodeList={episodeList} 
          isPlaying={isPlaying} 
          togglePlay={togglePlay}
          setPlayingState={setPlayingState}
          playPrev={playPrev}
          playNext={playNext}
          hasPrevEpisode={hasPrevEpisode}
          hasNextEpisode={hasNextEpisode}
          isLooping={isLooping}
          toggleLoop={toggleLoop}
          isShuffling={isShuffling}
          toggleShuffle={toggleShuffle}
          clearPlayerState={clearPlayerState}
        />
      </footer>
      
     
    </div>
  );
}