import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {contentTypes} from './contentTypes'
import {entries} from './entries'
import {requests} from './requests'
const rootReducer = combineReducers({contentTypes, entries, requests, routing: routerReducer})

export default rootReducer
