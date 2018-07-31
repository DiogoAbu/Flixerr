import { action, observable } from 'mobx'
import { Dimensions } from 'react-native'

import { BaseStoreInterface } from '../interfaces'

const winData = Dimensions.get('window')

class BaseStore implements BaseStoreInterface {
  /** Whether Status Bar should show network activity */
  @observable networkActivity = false

  /** Landscape */
  @observable isLandscape = winData.width > winData.height

  /** Set whether it's landscape */
  @action
  setIsLandscape = (newIsLandscape: boolean) => {
    this.isLandscape = newIsLandscape
  }
}

export default BaseStore
