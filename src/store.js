/* eslint no-console: 0 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import filters from './reducers/filtersReducer'
import glossary from './reducers/glossaryReducer'
import incidents from './reducers/incidentsReducer'

const logger = store => next => action => {
  const result = next(action)
  console.log('::dispatching::', action)
  console.log('::next state::', store.getState())
  return result
}

const reducer = combineReducers({ filters, glossary, incidents })
const store = createStore(reducer, applyMiddleware(logger, thunk))

export default store
