export interface RouteStoreInterface {
  readonly routes: string[]
  current: string
  setRoute: (route: string) => void
}
