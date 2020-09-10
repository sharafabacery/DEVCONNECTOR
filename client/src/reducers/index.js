//combine reducers

import {combineReducers} from 'redux'

import alert from './alret'
import auth from './auth'
import profile from './profile'

//all reducers can take
export default combineReducers({
alert,
auth,
profile
})