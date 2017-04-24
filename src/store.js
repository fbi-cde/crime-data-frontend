/* eslint-disable arrow-body-style */

import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'

const middlewares = [thunk]
if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger())

const configureStore = (preloadedState = {}) => {
  return createStore(reducer, preloadedState, applyMiddleware(...middlewares))
}

export default configureStore
