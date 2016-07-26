import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import scour from 'scourjs'
import rootReducer from './reducers/index'

const initialState = {
  api: {
    deliveryAccessToken: '',
    previewAccessToken: '',
    selectedApi: 'delivery',
    space: ''
  },
  contentTypes: {
    fetching: false,
    validationError: null,
    payload: []
  },
  entries: {
    fetching: false,
    entry: undefined,
    payload: scour([]),
    skip: 0,
    total: undefined,
    error: null
  },
  requests: []
}
const middleware = applyMiddleware(promiseMiddleware(), thunk, logger())

function RunDevToolExtensionIfNotInProduction () {
  const shouldExposeState = (!process.env.NODE_ENV ||
  process.env.NODE_ENV !== 'production') &&
  window.devToolsExtension
  return (shouldExposeState ? window.devToolsExtension() : (f) => f)
}
export const store = createStore(rootReducer, initialState, compose(middleware,
  RunDevToolExtensionIfNotInProduction()
))

export const history = syncHistoryWithStore(browserHistory, store)
