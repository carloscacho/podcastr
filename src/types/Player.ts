export type EpisodeType = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

export type PlayerContextsData = {
  episodeList: EpisodeType[];
  currentEpisodeIndex: number;
  play: (episode: EpisodeType) => void;
  togglePlay:  () => void;
  toggleLoop:  () => void;
  toggleShuffle:  () => void;
  setPlayingState: (state: boolean) => void;
  isPlaying: boolean;
  playList: (list: EpisodeType[], index: number) => void;
  playNext: () => void;
  playPrev: () => void;
  clearPlayerState: () => void;
  hasNextEpisode: boolean;
  hasPrevEpisode: boolean;
  isLooping: boolean;
  isShuffling: boolean;

};