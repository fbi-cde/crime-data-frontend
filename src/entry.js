import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import routes from './routes'
import configureStore from './store'

import '../sass/app.scss'

const preloadedState = window.__STATE__
const store = configureStore(preloadedState)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>{routes}</Provider>,
    document.getElementById('app'),
  )
}

if (window && window.localStorage) window.localStorage.clear()

render()
store.subscribe(render)
