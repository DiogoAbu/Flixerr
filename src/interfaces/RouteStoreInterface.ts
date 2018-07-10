export interface RouteStoreInterface {
  readonly routes: string[]
  current: string
  goTo(route: string): void
}
