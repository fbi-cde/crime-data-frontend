/* eslint no-console: 0 */

import { combineReducers, createStore, applyMiddleware } from 'redux'
import glossary from './reducers/glossaryReducer'

const logger = store => next => action => {
  console.log('::dispatching::', action)
  const result = next(action)
  console.log('::next state::', store.getState())
  return result
}

const reducer = combineReducers({ glossary })
const store = createStore(reducer, applyMiddleware(logger))

export default store
