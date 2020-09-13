import { GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST,ADD_COMMENT,DELETE_COMMENT} from "../actions/types";
const intitialState={
    posts:[],
    post:null,
    loading:true,
    error:{

    }
}

export default function (state=intitialState,action) {
    const{type,payload}=action

    switch (type) {
        case GET_POSTS:
        return{
            ...state,
             loading:false,
            posts:payload,
           
        }

        case GET_POST:
        return{
            ...state,
            loading:false,
            post:payload,
           
        }
        
        case POST_ERROR:
        return{
            ...state,
            error:payload,
            loading:false
        }
        case ADD_COMMENT:
        return{
           ...state,
           post:{...state.post,comments:payload},
           loading:false
        }
        case DELETE_COMMENT:
            return{
               ...state,
               post:{...state.post,comments:state.post.comments.filter(comment=>comment._id !== payload)},
               loading:false
            }
        case ADD_POST:
        return{
            ...state,
            posts:[...state.posts,payload],
            loading:false
        }
        case DELETE_POST:
        return{
            ...state,
            posts:state.posts.filter(post=>post._id !==payload)
        }
        case UPDATE_LIKES:
        return{
            ...state,
            posts:state.posts.map(post=>post._id ===payload.id ?{...post,likes:payload.likes}:post)
        }
        
        default:
        return state;
    }
}