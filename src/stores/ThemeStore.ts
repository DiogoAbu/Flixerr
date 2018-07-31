import { action, computed, observable } from 'mobx'

import { ThemeStoreInterface } from '../interfaces'
import * as themes from '../themes'

class ThemeStore implements ThemeStoreInterface {
  /** Available themes */
  readonly available: object = themes

  /** Theme */
  @observable current = 'dark'

  /** Get theme variables */
  @computed
  get theme(): object {
    return this.current in this.available ? this.available[this.current] : this.available.dark
  }

  /** Set theme to be used */
  @action
  setTheme = (theme: string) => {
    if (theme in this.available) {
      this.current = theme
    }
  }
}

export default ThemeStore
