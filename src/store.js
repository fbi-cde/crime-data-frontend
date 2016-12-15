import { combineReducers, createStore } from 'redux'
import glossary from './reducers/glossaryReducer'

const reducer = combineReducers({ glossary })
const store = createStore(reducer)

export default store
