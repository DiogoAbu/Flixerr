import { action, computed, observable } from 'mobx'

import * as themes from '../themes'

class ThemeStore {
  /** Available themes */
  readonly available: object = themes

  /** Theme */
  @observable current = 'dark'

  /** Get theme variables */
  @computed
  get theme() {
    return this.current in themes ? themes[this.current] : themes.dark
  }

  /** Set theme to be used */
  @action
  set(theme) {
    if (theme in this.available) {
      this.current = theme
    }
  }
}

export default ThemeStore
