import styles from './style.module.scss';

export function PlayerControllers() {
  return (
    <div className={styles.controllers}>
      <div className={styles.progress}>
        <span>00:00</span>
        <div className={styles.slider}>
          <div className={styles.emptySlider} />
        </div>
        <span>00:00</span>
      </div>

      <div className={styles.buttons} >
        <button type="button">
          <img src="/shuffle.svg" alt="Embaralhar Playlist"/>
        </button>
        <button type="button">
          <img src="/play-previous.svg" alt="Tocar Anterior"/>
        </button>
        <button type="button" className={styles.playButton}>
          <img src="/play.svg" alt="Tocar Podcast"/>
        </button>
        <button type="button">
          <img src="/play-next.svg" alt="Tocar próxima"/>
        </button>
        <button type="button">
          <img src="/repeat.svg" alt="Repetir Podcast"/>
        </button>
      </div>
    </div>
    
  )
}