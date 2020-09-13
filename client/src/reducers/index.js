//combine reducers

import {combineReducers} from 'redux'

import alert from './alret'
import auth from './auth'
import profile from './profile'
import post from './post'

//all reducers can take
export default combineReducers({
alert,
auth,
profile,
post
})