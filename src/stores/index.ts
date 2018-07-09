import { enableLogging } from 'mobx-logger'

import BaseStore from './BaseStore'
import MediaStore from './MediaStore'
import RouteStore from './RouteStore'
import ThemeStore from './ThemeStore'

enableLogging({
  action: true,
  compute: true,
  predicate: () => __DEV__ && Boolean(window.navigator.userAgent),
  reaction: true,
  transaction: true,
})

class Stores {
  constructor() {
    this.baseStore = new BaseStore(this)
    this.mediaStore = new MediaStore(this)
    this.routeStore = new RouteStore(this)
    this.themeStore = new ThemeStore(this)
  }
}

export default new Stores()
