import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { contentTypes } from './contentTypes'
import { entries } from './entries'
import { requests } from './requests'
import { api } from './api'

const rootReducer = combineReducers({api, contentTypes, entries, requests, routing: routerReducer})

export default rootReducer
