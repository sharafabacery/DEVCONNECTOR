import React, { useState } from 'react'
import { connect } from 'react-redux'
import {addComment}from '../../actions/post'
const CommentForm = ({postID,addComment}) => {
    const[text,setText]=useState('')
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault()
            addComment(postID,{text})
            setText('')
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}


const mapDispatchToProps =dispatch=>( {
  addComment:(id,formData)=>dispatch(addComment(id,formData))   
})

export default connect(null, mapDispatchToProps)(CommentForm)
