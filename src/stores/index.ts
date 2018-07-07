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
    this.base = new BaseStore(this)
    this.media = new MediaStore(this)
    this.route = new RouteStore(this)
    this.theme = new ThemeStore(this)
  }
}

export default new Stores()
