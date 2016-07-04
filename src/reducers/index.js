import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {contentTypes} from './contentTypes'
import {entries} from './entries'
const rootReducer = combineReducers({contentTypes, entries, routing: routerReducer})

export default rootReducer
