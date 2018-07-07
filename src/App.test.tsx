import * as React from 'react'
import * as renderer from 'react-test-renderer' // tslint:disable-line:no-implicit-dependencies

import App from './App'

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON()
  expect(rendered).toBeTruthy()
})
