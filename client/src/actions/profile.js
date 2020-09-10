import axios from 'axios'
import { setAlert} from './alert'

import { GET_PROFILE,PROFILE_ERROR } from "./types";

//get current users profile
export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        
        dispatch({type:PROFILE_ERROR,payload:error.response.statusText,status:error.response.status})
    }
}
//create or update

export const createProfile=(formDate,history,edit=false)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res=await axios.post('/api/profile',formDate,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
        dispatch(
            setAlert(edit?'Profile updated':'Profile Created')
        )
        if (!edit) {
            history.push('/dashboard')
        }

    } catch (err) {
        const errors=err.response.data.errors
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
    }
}