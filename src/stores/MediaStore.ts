import { action, computed, observable, set, toJS } from 'mobx'
import { orderBy } from 'natural-orderby'

import { Episode, LatestDownloadedFile, Media, MediaStoreInterface, Movie, Queue, Series } from '../interfaces'

import fakeEpisodes1 from '../../assets/fakeEpisodes1.json'
import fakeEpisodes2 from '../../assets/fakeEpisodes2.json'
import fakeEpisodes3 from '../../assets/fakeEpisodes3.json'
import fakeMovieQueue from '../../assets/fakeMovieQueue.json'
import fakeMovies from '../../assets/fakeMovies.json'
import fakeSeries from '../../assets/fakeSeries.json'
import fakeSeriesQueue from '../../assets/fakeSeriesQueue.json'

class MediaStore implements MediaStoreInterface {
  /** Array of Movie and Series */
  @observable media: Media[] = []

  /** Array of Movie and Series */
  @observable queue: Queue[] = []

  /** How is media currently ordered */
  currentOrder: string

  /** Sort media by title */
  @computed
  get mediaSortedByTitle(): Media[] {
    this.currentOrder = 'title'
    return orderBy(toJS(this.media), [(v: Media) => v.sortTitle], ['asc'])
  }

  /** Sort media by date added */
  @computed
  get mediaSortedByAdded(): Media[] {
    this.currentOrder = 'added'
    return orderBy(toJS(this.media), [(v: Media) => v.added, (v: Media) => v.sortTitle], ['desc', 'asc'])
  }

  /** Sort media by file date added */
  @computed
  get mediaSortedByFileAdded(): Media[] {
    this.currentOrder = 'fileAdded'
    return orderBy(toJS(this.media), [(v: Media) => this._getLatestDownloadedFile(v).date, (v: Media) => v.sortTitle], ['desc', 'asc'])
  }

  /** Get all media */
  @action
  fetchAll = async () => {
    const movies = await this._fetchMovies()
    const series = await this._fetchSeries()

    this.currentOrder = 'default'
    set(this.media, [...movies, ...series])

    set(
      this.queue,
      orderBy(
        [...fakeMovieQueue, ...fakeSeriesQueue],
        [(v: Queue) => v.status, (v: Queue) => v.timeleft, (v: Queue) => v.estimatedCompletionTime],
        ['desc', 'asc', 'asc']
      )
    )
  }

  /** Get movies from api */
  private _fetchMovies = async (): Movie[] => {
    try {
      const movies = fakeMovies
      return movies.map(m => {
        const latestDownloadedFile = this._getLatestDownloadedFile(m)
        return { ...m, latestDownloadedFile }
      })
    } catch (e) {
      throw e
    }
  }

  /** Get series and episodes from api */
  private _fetchSeries = async (): Series[] => {
    try {
      const series = fakeSeries
      return this._fetchEpisodesForSeries(series)
    } catch (e) {
      throw e
    }
  }

  /** Get episodes of each series from api */
  private _fetchEpisodesForSeries = async (series: Series[]): Series[] => {
    try {
      return series.map(s => {
        let episodes: Episode[]
        if (s.id === 1) {
          episodes = fakeEpisodes1
        } else if (s.id === 2) {
          episodes = fakeEpisodes2
        } else if (s.id === 3) {
          episodes = fakeEpisodes3
        }
        const updated = { ...s, episodes: orderBy(episodes, [(v: Episode) => v.episodeFileId], ['desc']), isSeries: true }
        const latestDownloadedFile = this._getLatestDownloadedFile(updated)
        return { ...updated, latestDownloadedFile }
      })
    } catch (e) {
      throw e
    }
  }

  /** Returns download date of media's latest downloaded file or media's added date, for movies, air date, for series. Also returns episode and season number for series */
  private _getLatestDownloadedFile(item: Media): LatestDownloadedFile {
    if (!item.isSeries) {
      return {
        date: item.hasFile ? item.movieFile.dateAdded : item.added,
        hasFile: item.hasFile,
      }
    }
    // Get first episode with file, if undefined, get first episode with air date
    const episode: Episode = item.episodes.find(e => e.hasFile) || item.episodes.find(e => e.airDateUtc)
    if (episode) {
      return {
        date: episode.hasFile ? episode.episodeFile.dateAdded : episode.airDateUtc,
        episodeNumber: episode.episodeNumber,
        hasFile: episode.hasFile,
        seasonNumber: episode.seasonNumber,
      }
    }
  }
}

export default MediaStore
