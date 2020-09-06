import React ,{Fragment,useState}from 'react'
import {Link, Redirect} from 'react-router-dom'
import{connect} from 'react-redux'
import { login } from "../../actions/auth";

function Login({login,isAuthenticated}) {
    //this.sestate
    //setformdata to make a copy of changed data
    //onchange to get any change happen
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const {email,password}=formData
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit=async e=>{ 
      e.preventDefault();
      login(email,password)

    }

    if (isAuthenticated) {
      return <Redirect to="/dashboard"/>
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Sign IN</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into your accoumt</p>
        <form className="form" action="create-profile.html"  onSubmit={e=>{onSubmit(e)}}>
         
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={ e =>onChange(e)} required/>
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              required
              value={password} onChange={ e =>onChange(e)}
            />
          </div>
  
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Dont Have Account <Link to="Register">Sign Up</Link>
        </p>
        </Fragment>
    )
}

const mapDispatchToProps=(dispatch)=>(
  {
    login:(email,password)=>dispatch(login(email,password))
   
  }
)

const mapToStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapToStateToProps,mapDispatchToProps)(Login)
