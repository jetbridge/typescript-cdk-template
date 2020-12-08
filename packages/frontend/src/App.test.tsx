import React from 'react'
import ReactDOM from 'react-dom'
import AppWithoutAuth from './AppWithoutAuth'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AppWithoutAuth />, div)
  ReactDOM.unmountComponentAtNode(div)
})
