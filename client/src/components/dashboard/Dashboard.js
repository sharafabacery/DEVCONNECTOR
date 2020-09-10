import React,{useEffect,Fragment} from 'react'

import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
function Dashboard({getCurrentProfile,auth:{user},profile:{profile,loading}}) {
    useEffect(()=>{
        getCurrentProfile()
    },[])
    return loading && profile ===null ?<Spinner/>:<Fragment>
    
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
    <i className="fas fa-user">
    Welcome {user&&user.name}
    </i>
    </p>
    {
        profile !==null ?<Fragment>has</Fragment>:<Fragment><p>You have not yet setup a profile, please add some info</p>
        <Link to='/create-profile' className='btn btn-primary my-1'>
        Create Profile
        </Link>
        </Fragment>
    }
    
    </Fragment>
}
const mapToStateToProps=state=>({
    auth:state.auth,
    profile:state.profile
  })

const mapDispatchToProps=(dispatch)=>(
    {

      getCurrentProfile:()=>dispatch(getCurrentProfile())
     
    }
)
export default connect(mapToStateToProps,mapDispatchToProps)(Dashboard)
