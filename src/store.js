/* eslint no-console: 0 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import filters from './reducers/filtersReducer'
import glossary from './reducers/glossaryReducer'
import nibrs from './reducers/nibrsReducer'
import summaries from './reducers/summaryReducer'

const logger = store => next => action => {
  const result = next(action)
  console.log('::dispatching::', action)
  console.log('::next state::', store.getState())
  return result
}

const middlewares = [thunk]
if (process.env.NODE_ENV !== 'production') middlewares.push(logger)

const reducer = combineReducers({ filters, glossary, nibrs, summaries })
const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
