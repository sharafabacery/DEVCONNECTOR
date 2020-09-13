import React, { Fragment,useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getpost } from "../../actions/post";
 const Post = ({getpost,post:{loading,post},match}) => {
     useEffect(()=>{
        getpost(match.params.id)
     },[getpost])
    return loading || post===null ?<Spinner/>:<Fragment>
      <Link to='/posts' className="btn">Back to posts</Link>
    <PostItem post={post} showActions={false}/>
    <CommentForm postID={match.params.id}/>
     <div className="comments">
     {post.comments.map((comment)=><CommentItem key={comment._id} comment={comment} postId={post._id}/>)}
     </div>
    </Fragment>
}


const mapStateToProps = (state) => ({
    post:state.post
})

const mapDispatchToProps =dispatch=> ({
    getpost:(id)=>dispatch(getpost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
