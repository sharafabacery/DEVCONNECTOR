import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types.js'

const initialState = [
    //idd
    // {
    //     id:1,
    //     msg:"please login in",
    //     alertType:"suc"
    // }
]

export default function (state = initialState, action) {
    const{type,payload}=action
    switch (type) {
        case SET_ALERT:
            return [...state,payload] //idd
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !==   payload)
        default:
            return state
    }
}