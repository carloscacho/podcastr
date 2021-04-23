import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css'
import styles from './style.module.scss';
import { convertDurationToTimeString } from '../../utils/convertions';

export function PlayerControllers(props) {
  const {
    episode,
    episodeList, 
    isPlaying, 
    togglePlay, 
    setPlayingState,
    playNext,
    playPrev,
    hasPrevEpisode,
    hasNextEpisode,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    clearPlayerState
  } = props;


  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(!audioRef.current){
      return;
    }
    if (isPlaying){
      audioRef.current.play();
    }else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  function setupProgressListener(){
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', event => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodesEnded() {
    if(hasNextEpisode){
      playNext()
    } else {
      clearPlayerState()
    }
  }
  return (
    <div className={styles.controllers}>
      <div className={styles.progress}>
      <span>{convertDurationToTimeString(progress)}</span>
        <div className={styles.slider}>
          {episode ? 
          (
            <Slider
              max={episode.duration}
              value={progress}
              onChange={handleSeek}
              trackStyle={{backgroundColor: '#04d361'}}
              railStyle={{backgroundColor: '#9f75ff'}}
              handleStyle={{borderColor: '#04d361', borderWidth: 4}}
            />
          ) : 
          (
            <div className={styles.emptySlider} />
          )}
        </div>
        <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
      </div>

      {episode && (
        <audio 
          src={episode.url} 
          autoPlay
          loop={isLooping}
          ref={audioRef}
          onEnded={handleEpisodesEnded}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          onLoadedMetadata={() => setupProgressListener()}
        />
      )}


      <div className={styles.buttons} >
        <button 
          type="button" 
          disabled={!episode || episodeList.length === 1}
          onClick={toggleShuffle}
          className={isShuffling ? styles.isActive : ''}
        >
          <img src="/shuffle.svg" alt="Embaralhar Playlist"/>
        </button>
        <button type="button" disabled={!episode || !hasPrevEpisode} onClick={playPrev}>
          <img src="/play-previous.svg" alt="Tocar Anterior"/>
        </button>
        <button 
          type="button" 
          className={styles.playButton} 
          disabled={!episode}
          onClick={togglePlay}
        >
          {isPlaying ? 
            (
              <img src="/pause.svg" alt="Parar Podcast"/>
            ) : (
              <img src="/play.svg" alt="Tocar Podcast"/>
          )}
        </button>
        <button 
          type="button" 
          disabled={!episode || !hasNextEpisode} 
          onClick={playNext}
        >
          <img src="/play-next.svg" alt="Tocar próxima"/>
        </button>
        <button 
          type="button" 
          disabled={!episode}
          onClick={toggleLoop}
          className={isLooping ? styles.isActive : ''}
        >
          <img src="/repeat.svg" alt="Repetir Podcast"/>
        </button>
      </div>
    </div>
    
  )
}