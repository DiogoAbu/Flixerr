export interface BaseStoreInterface {
  networkActivity: boolean
  isLandscape: boolean
  setIsLandscape: (newIsLandscape: boolean) => void
}
