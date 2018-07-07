import { action, observable } from 'mobx'

class RouteStore {
  /** Available routes */
  readonly routes = ['Newly Added', 'Upcoming', 'Calendar']

  /** Current route */
  @observable current = 'Newly Added'

  /** Set current route */
  @action
  set(route) {
    if (this.routes.includes(route)) {
      this.current = route
    }
  }
}

export default RouteStore
