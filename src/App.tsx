import { Provider } from 'mobx-react/native'
import React from 'react'

import Home from './containers/Home'
import Stores from './stores'

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider {...Stores}>
        <Home />
      </Provider>
    )
  }
}

export default App
