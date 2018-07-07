import { action, observable } from 'mobx'
import { Dimensions } from 'react-native'

const winData = Dimensions.get('window')

class BaseStore {
  /** Whether Status Bar should show network activity */
  @observable networkActivity = false

  /** Landscape */
  @observable isLandscape = winData.width > winData.height

  /** Set whether it's landscape */
  @action
  setIsLandscape(newIsLandscape) {
    this.isLandscape = newIsLandscape
  }
}

export default BaseStore
