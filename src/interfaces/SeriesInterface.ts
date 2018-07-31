import { LatestDownloadedFile } from './MediaStoreInterface'

export interface Series {
  title: string
  alternateTitles: SeriesAlternateTitle[]
  sortTitle: string
  seasonCount: number
  totalEpisodeCount: number
  episodeCount: number
  episodeFileCount: number
  sizeOnDisk: number
  status: string
  overview: string
  previousAiring: string
  network: string
  airTime: string
  images: SeriesImage[]
  seasons: SeriesSeason[]
  year: number
  path: string
  profileId: number
  seasonFolder: boolean
  monitored: boolean
  useSceneNumbering: boolean
  runtime: number
  tvdbId: number
  tvRageId: number
  tvMazeId: number
  firstAired: string
  lastInfoSync: string
  seriesType: string
  cleanTitle: string
  imdbId: string
  titleSlug: string
  certification: string
  genres: string[]
  tags: any[]
  added: string
  ratings: Series
  qualityProfileId: number
  id: number
  episodes?: Episode[]
  isSeries?: boolean
  latestDownloadedFile?: LatestDownloadedFile
}

export interface SeriesAlternateTitle {
  title: string
  seasonNumber: number
}

export interface SeriesImage {
  coverType: string
  url: string
}

export interface SeriesRatings {
  votes: number
  value: number
}

export interface SeriesSeason {
  seasonNumber: number
  monitored: boolean
  statistics: SeriesStatistics
}

export interface SeriesStatistics {
  previousAiring: string
  episodeFileCount: number
  episodeCount: number
  totalEpisodeCount: number
  sizeOnDisk: number
  percentOfEpisodes: number
}

export interface Episode {
  seriesId: number
  episodeFileId: number
  seasonNumber: number
  episodeNumber: number
  title: string
  airDate: string
  airDateUtc: string
  overview?: string
  episodeFile?: EpisodeFile
  hasFile: boolean
  monitored: boolean
  sceneEpisodeNumber?: number
  sceneSeasonNumber?: number
  tvDbEpisodeId?: number
  absoluteEpisodeNumber?: number
  unverifiedSceneNumbering?: boolean
  id: number
}

export interface EpisodeFile {
  seriesId: number
  seasonNumber: number
  relativePath: string
  path: string
  size: number
  dateAdded: string
  sceneName?: string
  quality: EpisodeQuality
  mediaInfo: EpisodeMediaInfo
  qualityCutoffNotMet: boolean
  id: number
}

export interface EpisodeMediaInfo {
  audioChannels: number
  audioCodec: string
  videoCodec: string
}

export interface EpisodeQuality {
  quality: SonarrQuality
  revision: EpisodeRevision
}

export interface SonarrQuality {
  id: number
  name: string
  source: string
  resolution: number
}

export interface EpisodeRevision {
  version: number
  real: number
}

export interface SeriesQueue {
  series: Series
  episode: Episode
  quality: EpisodeQuality
  size: number
  title: string
  sizeleft: number
  timeleft: string
  estimatedCompletionTime: string
  status: string
  trackedDownloadStatus: string
  statusMessages: any[]
  downloadId: string
  protocol: string
  id: number
}
