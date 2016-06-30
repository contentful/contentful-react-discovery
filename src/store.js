import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'

import rootReducer from './reducers/index'

const initialState = {
  contentTypes: {
    fetching: false,
    space: '',
    deliveryAccessToken: '',
    previewAccessToken: '',
    selectedApi: 'delivery',
    validationError: null,
    payload: []
  }
}
const middleware = applyMiddleware(promiseMiddleware(), thunk, logger())

export const store = createStore(rootReducer, initialState, middleware)
export const history = syncHistoryWithStore(browserHistory, store)
