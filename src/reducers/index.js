import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import contentTypes from './contentTypes'

const rootReducer = combineReducers({contentTypes, routing: routerReducer})

export default rootReducer
