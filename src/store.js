import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'

import rootReducer from './reducers/index'

const initialState = {
  contentTypes: {}
}
const middleware = applyMiddleware(promiseMiddleware(), thunk, logger())
const store = createStore(rootReducer, initialState, middleware)
const history = syncHistoryWithStore(browserHistory, store)

export default {
  store,
  history
}
