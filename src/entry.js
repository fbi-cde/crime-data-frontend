import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import routes from './routes'
import store from './store'

import '../sass/app.scss'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>{routes}</Provider>,
    document.getElementById('app'),
  )
}

render()
store.subscribe(render)
