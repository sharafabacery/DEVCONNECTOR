import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {logout} from '../../actions/auth'
 const Navbar = ({auth,logout}) => {
    const authLinks=(
      <ul>
      <li><Link to="/dashboard">
      <i className="fas fa-user" />{' '}
     
      <span className="hide-sm"> Dashboard</span>
      </Link></li>
      <li>
      
      <a onClick={logout} href='#!' >

      <i className="fas fa-sign-out-alt" />{' '}
      <span className="hide-sm"> logout</span>
    
      </a></li>
     
    </ul>
    )
    const guestLinks=( <ul>
      <li><a href='#!' >Developers</a></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>)
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {
        (<Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>)
      }
    </nav>
    )
}
const mapToStateToProps=state=>({
  auth:state.auth
})

const mapDispatchToProps=(dispatch)=>(
  {
    logout:()=>dispatch(logout())
   
  }
)
export default connect(mapToStateToProps,mapDispatchToProps)(Navbar);