import {combineReducers} from 'redux'

import AuthRedu from './Auth'
import profileReducer from './Profile'

export default combineReducers({
    AuthRedu,profileReducer
})