import { action, computed, observable, set, toJS } from 'mobx'
import { orderBy } from 'natural-orderby'

import fakeEpisodes1 from './fakeEpisodes1.json'
import fakeEpisodes2 from './fakeEpisodes2.json'
import fakeEpisodes3 from './fakeEpisodes3.json'
import fakeMovies from './fakeMovies.json'
import fakeSeries from './fakeSeries.json'

class MediaStore {
  /** Media */
  @observable media = []

  /** How is media currently ordered */
  currentOrder = 'default'

  /** Sort media by title */
  @computed
  get sortTitle() {
    this.currentOrder = 'title'
    return orderBy(toJS(this.media), [v => v.sortTitle], ['asc'])
  }

  /** Sort media by date added */
  @computed
  get sortAdded() {
    this.currentOrder = 'added'
    return orderBy(toJS(this.media), [v => v.added, v => v.sortTitle], ['desc', 'asc'])
  }

  /** Sort media by file date added */
  @computed
  get sortFileAdded() {
    this.currentOrder = 'fileAdded'
    return orderBy(
      toJS(this.media),
      [
        v => {
          if (!v.isSeries) {
            return v.movieFile ? v.movieFile.dateAdded : -1
          }

          // Return date added
          for (const episode of v.episodes) {
            if (episode.hasFile) {
              return episode.episodeFile.dateAdded
            }
          }
          // No date added found, return air date
          return v.episodes[0].airDateUtc
        },
        v => v.sortTitle,
      ],
      ['desc', 'asc']
    )
  }

  /** Get all media */
  @action
  fetchMedia = () => {
    const movies = this._fetchMovies()
    const series = this._fetchSeries()

    this.currentOrder = 'default'
    set(this.media, [...movies, ...series])
  }

  /** Get movies from api */
  @action private _fetchMovies = () => fakeMovies

  /** Get series from api */
  @action
  private _fetchSeries = () => {
    const series = fakeSeries
    return series.map(e => {
      let episodes
      if (e.id === 1) {
        episodes = fakeEpisodes1
      } else if (e.id === 2) {
        episodes = fakeEpisodes2
      } else if (e.id === 3) {
        episodes = fakeEpisodes3
      }
      return { ...e, episodes: orderBy(episodes, [v => v.episodeFileId], ['desc']), isSeries: true }
    })
  }
}

export default MediaStore
