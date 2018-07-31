import { Movie, MovieQueue } from './MovieInterface'
import { Series, SeriesQueue } from './SeriesInterface'

export type Media = Movie | Series
export type Queue = MovieQueue | SeriesQueue

export interface MediaStoreInterface {
  media: Media[]
  queue: Queue[]
  currentOrder: string
  mediaSortedByTitle: () => Media[]
  mediaSortedByAdded: () => Media[]
  mediaSortedByFileAdded: () => Media[]
  fetchAll: () => void
  private _fetchMovies: () => Movie[]
  private _fetchSeries: () => Series[]
  private _fetchEpisodesForSeries: (series: Series[]) => Series[]
  private _getLatestDownloadedFile: (item: Media) => LatestDownloadedFile
}

export interface LatestDownloadedFile {
  date: string
  hasFile: boolean
  episodeNumber?: boolean
  seasonNumber?: boolean
}
