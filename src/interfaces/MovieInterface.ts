import { LatestDownloadedFile } from './MediaStoreInterface'

export interface Movie {
  title: string
  alternativeTitles: MovieAlternativeTitle[]
  secondaryYearSourceId?: number
  sortTitle: string
  sizeOnDisk: number
  status: string
  overview: string
  inCinemas: string
  physicalRelease?: string
  physicalReleaseNote?: string
  images: MovieImage[]
  website: string
  downloaded: boolean
  year: number
  hasFile: boolean
  youTubeTrailerId: string
  studio: string
  path: string
  profileId: number
  pathState?: string
  monitored: boolean
  minimumAvailability: string
  isAvailable?: boolean
  folderName?: string
  runtime: number
  lastInfoSync: string
  cleanTitle: string
  imdbId: string
  tmdbId: number
  titleSlug: string
  genres: string[]
  tags: MovieTag[]
  added: string
  ratings: MovieRatings
  movieFile?: MovieFile
  qualityProfileId: number
  id: number
  latestDownloadedFile?: LatestDownloadedFile
}

export interface MovieAlternativeTitle {
  sourceType: string
  movieId: number
  title: string
  sourceId: number
  votes: number
  voteCount: number
  language: string
  id: number
}

export interface MovieImage {
  coverType: string
  url: string
}

export interface MovieFile {
  movieId: number
  relativePath: string
  size: number
  dateAdded: string
  releaseGroup: string
  quality: MovieQuality
  edition: string
  mediaInfo: MovieFileMediaInfo
  id: number
}

export interface MovieFileMediaInfo {
  videoCodec: string
  videoBitrate: number
  videoBitDepth: number
  width: number
  height: number
  audioFormat: string
  audioBitrate: number
  runTime: string
  audioStreamCount: number
  audioChannels: number
  audioChannelPositions: string
  audioChannelPositionsText: string
  audioProfile: string
  videoFps: number
  audioLanguages: string
  subtitles: string
  scanType: string
  schemaRevision: number
}

export interface MovieQuality {
  quality: RadarrQuality
  revision: MovieRevision
}

export interface RadarrQuality {
  id: number
  name: string
}

export interface MovieRevision {
  version: number
  real: number
}

export interface MovieRatings {
  votes: number
  value: number
}

export interface MovieTag {
  id: number
  label: string
}

export interface MovieQueue {
  movie: Movie
  quality: MovieQuality
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
