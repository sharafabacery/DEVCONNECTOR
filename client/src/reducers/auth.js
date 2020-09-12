import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                    loading: false,
                    user: payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state, ...payload, isAuthenticated: true,
                loading: false,
            }
        case LOGOUT:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return {
                ...state, token: null, isAuthenticated: false,
                loading: false,
            }
            default:
            return state
    }
}