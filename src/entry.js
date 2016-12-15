import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import routes from './routes'
import store from './store'

import '../sass/app.scss'

const rootEl = document.getElementById('app')
const render = () => {
  ReactDOM.render((
    <Provider store={store} >
      { routes }
    </Provider>
  ), rootEl)
}

store.subscribe(() => render())
render()
