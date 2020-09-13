import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {deleteComment}from '../../actions/post'
import auth from '../../reducers/auth';
const CommentItem = ({postId,comment:{_id,text,name,avatar,user,date},deleteComment,auth}) => {
    return (
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
         {text}
          </p>
           <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {
              !auth.loading &&user===auth.user._id &&(<button onClick={e=>deleteComment(postId,_id)} type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>

              </button>)
          }
        </div>
      </div>

    )
}

const mapStateToProps =state=>( {
   auth:state.auth 
})

const mapDispatchToProps = dispatch=>({
    deleteComment:(id,commentid)=>dispatch(deleteComment(id,commentid))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
