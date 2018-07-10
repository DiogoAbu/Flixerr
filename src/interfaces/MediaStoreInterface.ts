import { Movie } from './MovieInterface'
import { Series } from './SeriesInterface'

export type Media = Movie | Series

export interface MediaStoreInterface {
  media: Media[]
  currentOrder: string
  sortTitle(): Media[]
  sortAdded(): Media[]
  sortFileAdded(): Media[]
  sortOneFileAdded(item: Media): SortOneFileAdded
  fetchMedia(): void
  _fetchMovies(): Movie[]
  _fetchSeries(): Series[]
}

export interface SortOneFileAdded {
  date: string
  download: boolean
}
