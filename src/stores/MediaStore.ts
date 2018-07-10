import { action, computed, observable, set, toJS } from 'mobx'
import { orderBy } from 'natural-orderby'

import { Episode, Media, MediaStoreInterface, Movie, Series, SortOneFileAdded } from '../interfaces'

import fakeEpisodes1 from './fakeEpisodes1.json'
import fakeEpisodes2 from './fakeEpisodes2.json'
import fakeEpisodes3 from './fakeEpisodes3.json'
import fakeMovies from './fakeMovies.json'
import fakeSeries from './fakeSeries.json'

class MediaStore implements MediaStoreInterface {
  /** Array of Movie and Series */
  @observable media: Media[] = []

  /** How is media currently ordered */
  currentOrder: string

  /** Sort media by title */
  @computed
  get sortTitle(): Media[] {
    this.currentOrder = 'title'
    return orderBy(toJS(this.media), [(v: Media) => v.sortTitle], ['asc'])
  }

  /** Sort media by date added */
  @computed
  get sortAdded(): Media[] {
    this.currentOrder = 'added'
    return orderBy(toJS(this.media), [(v: Media) => v.added, (v: Media) => v.sortTitle], ['desc', 'asc'])
  }

  /** Sort media by file date added */
  @computed
  get sortFileAdded(): Media[] {
    this.currentOrder = 'fileAdded'
    return orderBy(toJS(this.media), [(v: Media) => this.sortOneFileAdded(v).date, (v: Media) => v.sortTitle], ['desc', 'asc'])
  }

  /** If Movie, returns movie file download date or movie added date. If Series, returns latest episode download date or air date */
  sortOneFileAdded(item: Media): SortOneFileAdded {
    if (!item.isSeries) {
      return {
        date: item.hasFile ? item.movieFile.dateAdded : item.added,
        downloaded: item.hasFile,
      }
    }
    // Return date added
    for (const episode of item.episodes) {
      if (episode.hasFile) {
        return {
          date: episode.episodeFile.dateAdded,
          downloaded: true,
        }
      }
    }
    // No date added found, return air date
    return {
      date: item.episodes[0].airDateUtc,
      downloaded: false,
    }
  }

  /** Get all media */
  @action
  fetchMedia = async () => {
    const movies = await this._fetchMovies()
    const series = await this._fetchSeries()

    this.currentOrder = 'default'
    set(this.media, [...movies, ...series])
  }

  /** Get movies from api */
  @action private _fetchMovies = async (): Movie[] => fakeMovies

  /** Get series and episodes from api */
  @action
  private _fetchSeries = async (): Series[] => {
    const series = fakeSeries
    return series.map(s => {
      let episodes: Episode[]
      if (s.id === 1) {
        episodes = fakeEpisodes1
      } else if (s.id === 2) {
        episodes = fakeEpisodes2
      } else if (s.id === 3) {
        episodes = fakeEpisodes3
      }
      return { ...s, episodes: orderBy(episodes, [(v: Episode) => v.episodeFileId], ['desc']), isSeries: true }
    })
  }
}

export default MediaStore
