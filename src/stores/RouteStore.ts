import { action, observable } from 'mobx'

import { RouteStoreInterface } from '../interfaces'

class RouteStore implements RouteStoreInterface {
  /** Available routes */
  readonly routes = ['Newly Added', 'Upcoming', 'Calendar']

  /** Current route */
  @observable current = 'Newly Added'

  /** Set current route */
  @action
  setRoute = (route: string) => {
    if (this.routes.includes(route)) {
      this.current = route
    }
  }
}

export default RouteStore
