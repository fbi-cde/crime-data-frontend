import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'

const middlewares = [thunk]
if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger())

const store = createStore(
  reducer,
  applyMiddleware(...middlewares),
)

export default store
