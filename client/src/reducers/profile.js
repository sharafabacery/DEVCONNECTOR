import { GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE } from "../actions/types";
const initialState = {
 //my profile
profile:null,
profiles:[],
repos:[],
loading:true,
error:''
}



export default function (state=initialState,action) {
    const {type,payload}=action

   switch (type) {
       case GET_PROFILE:
        return{
            ...state,
            profile:payload,
            loadind:false
        }   
        case PROFILE_ERROR:
        return{
           ...state,
           error:payload,
           loading:false
        }
        case CLEAR_PROFILE:
        return{
            ...state,
            profile:null,
            loading:false,
            repos:[]
        }
       default:
           return state
   }
}


