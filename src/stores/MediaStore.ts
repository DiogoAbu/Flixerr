import { computed, observable } from 'mobx'
// import moment from 'moment'
import { orderBy } from 'natural-orderby'

import fakeMovies from './fakeMovies.json'
import fakeSeries from './fakeSeries.json'

class MediaStore {
  /** Media */
  @observable media = orderBy([...fakeMovies, ...fakeSeries], [v => v.added, v => v.sortTitle], ['desc', 'asc'])

  @computed
  get sortAdded() {
    return orderBy(this.media, [v => v.added, v => v.sortTitle], ['desc', 'asc'])
  }
}

export default MediaStore
