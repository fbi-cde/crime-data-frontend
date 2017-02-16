/* eslint no-console: 0 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import filters from './reducers/filtersReducer'
import glossary from './reducers/glossaryReducer'
import nibrs from './reducers/nibrsReducer'
import sidebar from './reducers/sidebarReducer'
import summaries from './reducers/summaryReducer'
import ucr from './reducers/ucrReducer'

const reducer = combineReducers({
  filters,
  glossary,
  nibrs,
  sidebar,
  summaries,
  ucr,
})

const middlewares = [thunk]
if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger())

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
