import { createContext, ReactNode, useContext, useState } from "react";
import { PlayerContextsData, EpisodeType } from "../types/Player";

export const PlayerContexts = createContext({} as PlayerContextsData);

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PayerContextProvider(props: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [isOpenPlayer, setIsOpenPlayer] = useState(true)

  function play(episode: EpisodeType) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
    setIsOpenPlayer(true);
  }

  function playList(list: EpisodeType[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
    setIsOpenPlayer(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasNextEpisode = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevEpisode = currentEpisodeIndex > 0;
  
  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if(hasNextEpisode){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrev() {
    if(hasPrevEpisode){
      setCurrentEpisodeIndex(currentEpisodeIndex -1);
    }
  }

  function clearPlayerState() {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  function openPlayer() {
    setIsOpenPlayer(true);
  }

  function closePlayer() {
    setIsOpenPlayer(false);
  }

  function toggleOpenPlay() {
    setIsOpenPlayer(!isOpenPlayer)
  }

  return (
    <PlayerContexts.Provider value={{ 
      currentEpisodeIndex,
      episodeList,
      play,
      togglePlay,
      isPlaying,
      setPlayingState,
      playList,
      playPrev,
      playNext,
      hasPrevEpisode,
      hasNextEpisode,
      isLooping,
      toggleLoop,
      isShuffling,
      toggleShuffle,
      clearPlayerState,
      isOpenPlayer,
      openPlayer,
      closePlayer,
      toggleOpenPlay
    }}>
      {props.children}
    </PlayerContexts.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContexts);
}