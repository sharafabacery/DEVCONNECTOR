import React,{Fragment,useEffect} from 'react'
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
const Posts=({getPosts,post:{posts,loading}})=> {
    useEffect(()=>{
        getPosts()
    },[getPosts])
    return (
       
        loading ? <Spinner/>:
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
            </p> <PostForm/>
            {
                <div className="posts">
                {
                    posts.map(post=>(<PostItem key={post._id} post={post} showActions={true}/>))
                }
                </div>
            }
        </Fragment>
        
    )
}
const mapToStateToProps=state=>({
    post:state.post
})
const mapDispatchToProps=dispatch=>({
    getPosts:()=>dispatch(getPosts())
})
export default connect(mapToStateToProps,mapDispatchToProps)(Posts)
