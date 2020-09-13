import axios from 'axios'
import{ setAlert } from './alert'
import { GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST ,ADD_POST,GET_POST,ADD_COMMENT,DELETE_COMMENT} from "./types";

//Get posts
export const getPosts=()=>async dispatch=>{
     try {
        
        const res=await axios.get('/api/posts')
        console.log(res)
        dispatch({
          type:GET_POSTS,
          payload: res.data
        })

     } catch (error) {
      dispatch({
          type:POST_ERROR,
          payload:{msg:error.reponse.statusText,status:error.response.status}

        })
        
     }
}
export const addLike=(id)=>async dispatch=>{
     try {
      const res=await axios.put(`/api/posts/like/${id}`)
      dispatch({
        type:UPDATE_LIKES,
        payload:{
          id,likes:res.data
        }
      })
     } catch (error) {
       
      dispatch({
        type:POST_ERROR,
        payload:{status:error.response.status}

      })
     }
}

export const removeLike=id=>async dispatch=>{
  try {
   const res=await axios.delete(`/api/posts/unlike/${id}`)
   
   dispatch({
     type:UPDATE_LIKES,
     payload:{
      id,
      likes:res.data
     }
   })
  } catch (error) {

   dispatch({
     type:POST_ERROR,
     payload:{status:error.response.status}

   })
  }
}
export const deletePost=(id)=>async dispatch=>{
  try {
   await axios.delete(`/api/posts/${id}`)
   dispatch({
     type:DELETE_POST,
     payload:{
       id
     }
   })
   dispatch(setAlert('Post removed','success'))

  } catch (error) {
   dispatch({
     type:POST_ERROR,
     payload:{msg:error.reponse.statusText,status:error.response.status}

   })
  }
}
export const getpost=(id)=>async dispatch=>{
  try {
  const res= await axios.get(`/api/posts/${id}`)
   dispatch({
     type:GET_POST,
     payload:res.data
   })
  

  } catch (error) {
   dispatch({
     type:POST_ERROR,
     payload:{msg:error.reponse.statusText,status:error.response.status}

   })
  }
}

export const addPost=(formData)=>async dispatch=>{
  try {
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
  const res= await axios.post(`/api/posts`,formData,config)
   dispatch({
     type:ADD_POST,
     payload:res.data
   })
   dispatch(setAlert('Post Created','success'))

  } catch (error) {
   dispatch({
     type:POST_ERROR,
     payload:{msg:error.reponse.statusText,status:error.response.status}

   })
  }
}

export const addComment=(id,formData)=>async dispatch=>{
  try {
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
  const res= await axios.post(`/api/posts/comment/${id}`,formData,config)
   dispatch({
     type:ADD_COMMENT,
     payload:res.data
   })
   dispatch(setAlert('comment ADDED','success'))

  } catch (error) {
   dispatch({
     type:POST_ERROR,
     payload:{msg:error.reponse.statusText,status:error.response.status}

   })
  }
}
export const deleteComment=(id,commentid)=>async dispatch=>{
  try {
   
    await axios.delete(`/api/posts/comment/${id}/${commentid}`)
   dispatch({
     type:DELETE_COMMENT,
     payload:commentid
   })
   dispatch(setAlert('comment Removed','success'))

  } catch (error) {
   dispatch({
     type:POST_ERROR,
     payload:{msg:error.reponse.statusText,status:error.response.status}

   })
  }
}