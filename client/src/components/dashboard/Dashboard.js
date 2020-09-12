import React,{useEffect,Fragment} from 'react'
import { connect } from "react-redux";
import { getCurrentProfile,deleteAccount } from "../../actions/profile";
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
function Dashboard({getCurrentProfile,deleteAccount,auth:{user},profile:{profile,loading}}) {
    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile])
    return loading && profile ===null ?<Spinner/>:<Fragment>
    
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
    <i className="fas fa-user">
    Welcome {user&&user.name}
    </i>
    </p>
    {
        profile !==null ?<Fragment><DashboardActions/>
        <Experience experience={profile.experience}/>
        <Education education={profile.education}/>
        <div className="my-2">
        <button className="btn btn-danger" onClick={()=>deleteAccount()}><i className="fas fa-user-minus">
        </i>Delete My Account
        </button>
        </div>
        </Fragment>:<Fragment><p>You have not yet setup a profile, please add some info</p>
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
      ,deleteAccount:()=>dispatch(deleteAccount())
     
    }
)
export default connect(mapToStateToProps,mapDispatchToProps)(Dashboard)
