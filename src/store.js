/* eslint no-console: 0 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import glossary from './reducers/glossaryReducer'

const logger = store => next => action => {
  const result = next(action)
  console.log('::dispatching::', action)
  console.log('::next state::', store.getState())
  return result
}

const reducer = combineReducers({ glossary })
const store = createStore(reducer, applyMiddleware(logger))

export default store
